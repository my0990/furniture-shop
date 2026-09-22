"""
플레이스홀더 상품/배너 이미지를 생성하는 스크립트.
외부 네트워크 없이 PIL로 심플한 가구 실루엣 + 텍스트 이미지를 만든다.
실제 서비스에서는 이 이미지들을 실제 상품 사진으로 교체하면 된다.
"""
import os
import math
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_DIR = os.path.join(BASE, "public", "images", "products")
CATEGORIES_DIR = os.path.join(BASE, "public", "images", "categories")
HERO_PATH = os.path.join(BASE, "public", "images", "hero-banner.jpg")

os.makedirs(PRODUCTS_DIR, exist_ok=True)
os.makedirs(CATEGORIES_DIR, exist_ok=True)

# 가구 느낌의 웜톤 팔레트
PALETTES = {
    "living": [("#EFE6DA", "#C9A27E"), ("#EAE2D6", "#B08968")],
    "bedroom": [("#F1E7E4", "#C9908A"), ("#F3E9E2", "#B5837A")],
    "kitchen": [("#EDEFE6", "#8FA37E"), ("#ECEFE8", "#7C9070")],
    "office": [("#E9EDF0", "#6F8FA8"), ("#EAECEE", "#5C7C93")],
}

def get_font(size, bold=False):
    # 한글(Hangul)을 표시해야 하므로 CJK 글리프를 포함한 Noto Sans CJK KR을 사용한다.
    # DejaVu Sans에는 한글 글리프가 없어 이전 버전 이미지에서 글자가 깨져(네모/공백) 보였다.
    cjk_path = (
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
        if bold
        else "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"
    )
    if os.path.exists(cjk_path):
        # ttc 콜렉션 내 "Noto Sans CJK KR"의 인덱스는 1 (fc-scan으로 확인)
        return ImageFont.truetype(cjk_path, size, index=1)

    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def draw_gradient(draw_img, size, c1, c2):
    w, h = size
    c1 = hex_to_rgb(c1)
    c2 = hex_to_rgb(c2)
    for y in range(h):
        t = y / h
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw_img.line([(0, y), (w, y)], fill=(r, g, b))

def draw_silhouette(draw, shape, box, color):
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    if shape == "sofa":
        draw.rounded_rectangle([x0, y0 + h*0.35, x1, y1], radius=h*0.18, fill=color)
        draw.rounded_rectangle([x0, y0, x0 + w*0.18, y1], radius=h*0.12, fill=color)
        draw.rounded_rectangle([x1 - w*0.18, y0, x1, y1], radius=h*0.12, fill=color)
    elif shape == "table":
        draw.rounded_rectangle([x0, y0, x1, y0 + h*0.16], radius=h*0.04, fill=color)
        leg_w = w * 0.06
        draw.rectangle([x0 + w*0.08, y0+h*0.16, x0 + w*0.08+leg_w, y1], fill=color)
        draw.rectangle([x1 - w*0.08 - leg_w, y0+h*0.16, x1 - w*0.08, y1], fill=color)
    elif shape == "chair":
        draw.rounded_rectangle([x0 + w*0.15, y0, x0 + w*0.85, y0 + h*0.55], radius=w*0.08, fill=color)
        draw.rounded_rectangle([x0 + w*0.1, y0+h*0.45, x0 + w*0.9, y0+h*0.7], radius=h*0.06, fill=color)
        for lx in (x0+w*0.15, x0+w*0.78):
            draw.rectangle([lx, y0+h*0.65, lx+w*0.07, y1], fill=color)
    elif shape == "bed":
        draw.rounded_rectangle([x0, y0+h*0.15, x0+w*0.12, y1], radius=w*0.04, fill=color)
        draw.rounded_rectangle([x0+w*0.12, y0+h*0.45, x1, y1], radius=h*0.08, fill=color)
        draw.rounded_rectangle([x0+w*0.14, y0+h*0.35, x1-w*0.02, y0+h*0.55], radius=h*0.04, fill=color)
    elif shape == "wardrobe" or shape == "shelf" or shape == "cabinet":
        draw.rounded_rectangle([x0+w*0.1, y0, x1-w*0.1, y1], radius=w*0.03, fill=color)
        draw.line([(x0+w*0.5, y0), (x0+w*0.5, y1)], fill="white", width=max(2, int(w*0.01)))
        for i in range(1, 4):
            yy = y0 + (y1-y0) * i / 4
            draw.line([(x0+w*0.1, yy), (x1-w*0.1, yy)], fill="white", width=max(1, int(w*0.006)))
    elif shape == "desk":
        draw.rounded_rectangle([x0, y0+h*0.3, x1, y0+h*0.42], radius=h*0.03, fill=color)
        draw.rectangle([x0+w*0.05, y0+h*0.42, x0+w*0.1, y1], fill=color)
        draw.rectangle([x1-w*0.1, y0+h*0.42, x1-w*0.05, y1], fill=color)
        draw.rounded_rectangle([x0+w*0.6, y0+h*0.42, x0+w*0.85, y1], radius=w*0.02, fill=color)
    elif shape == "lamp":
        cx = (x0+x1)/2
        draw.polygon([(cx-w*0.28, y0+h*0.32), (cx+w*0.28, y0+h*0.32), (cx+w*0.18, y0), (cx-w*0.18, y0)], fill=color)
        draw.rectangle([cx-w*0.03, y0+h*0.32, cx+w*0.03, y1-h*0.05], fill=color)
        draw.ellipse([cx-w*0.22, y1-h*0.08, cx+w*0.22, y1], fill=color)
    else:
        draw.rounded_rectangle(box, radius=20, fill=color)

def make_image(path, title, subtitle, category, shape, size=(800, 800)):
    img = Image.new("RGB", size, "#FFFFFF")
    draw = ImageDraw.Draw(img)
    c1, c2 = PALETTES.get(category, [("#EFEFEF", "#BBBBBB")])[0]
    draw_gradient(draw, size, c1, c2)
    img = img.filter_dummy() if False else img
    draw = ImageDraw.Draw(img)

    w, h = size
    box = (w*0.16, h*0.28, w*0.84, h*0.78)
    draw_silhouette(draw, shape, box, "#FFFFFF")

    # subtle bottom label plate
    plate_h = h * 0.16
    draw.rectangle([0, h - plate_h, w, h], fill=(255, 255, 255, 235))
    font_title = get_font(int(h*0.045), bold=True)
    font_sub = get_font(int(h*0.028))
    text_color = "#3A2E27"
    draw.text((w*0.06, h - plate_h + plate_h*0.18), title, font=font_title, fill=text_color)
    draw.text((w*0.06, h - plate_h + plate_h*0.58), subtitle, font=font_sub, fill="#8A7D72")

    img.save(path, quality=88)

PRODUCTS = [
    ("living-sofa", "모던 3인용 소파", "리빙 · 소파", "living", "sofa"),
    ("living-tvstand", "우드 거실장", "리빙 · 수납", "living", "cabinet"),
    ("living-coffeetable", "라운드 커피테이블", "리빙 · 테이블", "living", "table"),
    ("living-armchair", "패브릭 암체어", "리빙 · 체어", "living", "chair"),
    ("bedroom-bedframe", "원목 침대프레임 Q", "침실 · 침대", "bedroom", "bed"),
    ("bedroom-mattress", "메모리폼 매트리스 Q", "침실 · 매트리스", "bedroom", "bed"),
    ("bedroom-wardrobe", "3단 원목 옷장", "침실 · 수납", "bedroom", "wardrobe"),
    ("bedroom-lamp", "무드등 협탁", "침실 · 조명", "bedroom", "lamp"),
    ("kitchen-diningtable", "6인용 원목 다이닝테이블", "주방 · 테이블", "kitchen", "table"),
    ("kitchen-chairs", "패브릭 식탁의자 2p", "주방 · 체어", "kitchen", "chair"),
    ("kitchen-cabinet", "화이트 주방수납장", "주방 · 수납", "kitchen", "cabinet"),
    ("kitchen-island", "아일랜드 식탁", "주방 · 테이블", "kitchen", "table"),
    ("office-desk", "리프트 책상", "오피스 · 데스크", "office", "desk"),
    ("office-chair", "메쉬 사무용 의자", "오피스 · 체어", "office", "chair"),
    ("office-bookshelf", "5단 원목 책장", "오피스 · 수납", "office", "shelf"),
    ("office-standingdesk", "모니터암 스탠딩데스크", "오피스 · 데스크", "office", "desk"),
]

CATEGORY_THUMBS = [
    ("living", "거실", "living", "sofa"),
    ("bedroom", "침실", "bedroom", "bed"),
    ("kitchen", "주방/다이닝", "kitchen", "table"),
    ("office", "홈오피스", "office", "desk"),
]


def make_hero():
    hero = Image.new("RGB", (1920, 800), "#EFE6DA")
    draw = ImageDraw.Draw(hero)
    draw_gradient(draw, (1920, 800), "#F3ECE1", "#C9A27E")
    draw_silhouette(draw, "sofa", (1920*0.55, 800*0.30, 1920*0.92, 800*0.85), "#FFFFFF")
    font_h1 = get_font(64, bold=True)
    font_h2 = get_font(30)
    draw.text((120, 280), "가을, 집을 새로 채우는 시간", font=font_h1, fill="#3A2E27")
    draw.text((120, 370), "2026 신상 가구 컬렉션 최대 30% 할인", font=font_h2, fill="#6B5C4F")
    hero.save(HERO_PATH, quality=90)


# 주의: 이 파일은 다른 스크립트에서 import해서 make_image() 등 개별 함수만 재사용할 수도 있으므로,
# 전체 일괄 생성은 반드시 아래 __main__ 가드 안에서만 실행되도록 한다.
# (이전에 실수로 import만 했는데도 전체 21개 이미지가 재생성되어버린 적이 있었음 - 재발 방지)
if __name__ == "__main__":
    for slug, title, subtitle, category, shape in PRODUCTS:
        make_image(os.path.join(PRODUCTS_DIR, f"{slug}.jpg"), title, subtitle, category, shape)
    for slug, title, category, shape in CATEGORY_THUMBS:
        make_image(os.path.join(CATEGORIES_DIR, f"{slug}.jpg"), title, "카테고리", category, shape, size=(600, 600))
    make_hero()
    print("done")

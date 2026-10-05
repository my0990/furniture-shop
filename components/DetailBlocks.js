export default function DetailBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="mt-16 space-y-6 border-t border-wood-100 pt-10">
      {blocks.map((block, index) => {
        if (block.type === "image" && block.url) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={index} src={block.url} alt="" className="w-full rounded-xl" />
          );
        }
        if (block.type === "text" && block.content) {
          return (
            <p
              key={index}
              className="whitespace-pre-line text-sm leading-relaxed text-wood-700"
            >
              {block.content}
            </p>
          );
        }
        if (block.type === "youtube" && block.videoId) {
          return (
            <div key={index} className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${block.videoId}`}
                title="상품 소개 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

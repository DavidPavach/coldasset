import { useState } from "react";

//Icons
import { Play, ExternalLink, ChevronRight, Star } from "lucide-react";


export default function FeaturedExchange({ name, logo, description, videoId, url, features }: FeaturedExchangeProps) {

  const [showVideo, setShowVideo] = useState<boolean>(false)

  return (
    <div className="relative bg-card shadow-2xl mb-12 border border-border rounded-2xl w-full overflow-hidden">
      {/* Subtle gradient overlay that adapts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-foreground" />
      </div>

      <div className="z-10 relative flex md:flex-row flex-col gap-8 md:gap-12 p-8 md:p-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Star size={16} className="text-primary" />
            <span className="font-medium text-[10px] text-primary md:text-xs xl:text-sm">
              Featured Exchange
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative bg-card p-2 ring-border rounded-full ring-1 size-8 md:size-12 xl:size-16">
              <img src={logo} alt={`${name} logo`} className="p-1 size-full object-center object-cover" />
            </div>
            <h2 className="font-bold text-primary-foreground text-xl md:text-2xl xl:text-3xl">
              {name}
            </h2>
          </div>

          <p className="mb-6 max-w-2xl text-primary-foreground/80 text-sm md:text-base xl:text-lg">
            {description}
          </p>

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight size={16} className="text-primary" />
                <span className="text-primary-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex sm:flex-row flex-col gap-4">
            <button type="button" onClick={() => setShowVideo((v) => !v)}
              className="inline-flex justify-center items-center gap-2 bg-background/30 hover:bg-background/45 backdrop-blur-sm px-6 py-3 border border-border rounded-lg text-primary-foreground transition-colors">
              <Play size={18} />
              <span>{showVideo ? "Hide Tutorial" : "Watch Tutorial"}</span>
            </button>

            <a href={url} target="_blank" rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-medium text-primary-foreground transition-colors">
              <span>Buy on {name}</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center">
          {showVideo ? (
            <div className="bg-muted shadow-2xl border border-border rounded-lg w-full max-w-md aspect-square md:aspect-video overflow-hidden">
              <iframe src={`https://www.youtube.com/embed/${videoId}`} title={`How to buy cryptocurrency on ${name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full" />
            </div>
          ) : (
            <button type="button" onClick={() => setShowVideo(true)}
              className="relative bg-muted shadow-2xl border border-border rounded-lg w-full max-w-md aspect-square md:aspect-video overflow-hidden"
              aria-label={`Play tutorial for ${name}`}>
              <div className="absolute inset-0 bg-foreground/25" />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex justify-center items-center bg-primary shadow-lg rounded-full size-16">
                  <Play size={24} className="ml-1 text-primary-foreground" />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import type { GetImageResult } from "astro"
import { X } from "lucide-react"
import React from "react"
interface ImageGalleryProps {
  imageProps: GetImageResult[]
}
export const ImageGallery = (props: ImageGalleryProps) => {
  const [open, setOpen] = React.useState(false)
  const { imageProps } = props
  const [count, setCount] = React.useState(0)
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  React.useEffect(() => {
    if (!api) return
    if (current !== api.selectedScrollSnap()) {
      api.scrollTo(current, true)
    }
  }, [api, current])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {imageProps.map((image, i) => {
        return (
          <DialogTrigger
            onClick={() => {
              setCurrent(i)
            }}
            className="w-full h-full relative aspect-square "
            key={image.src}
          >
            <img
              src={image.src}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              srcSet={image.srcSet.attribute}
              alt={`Zdjęcie ${i + 1} z portfolio ślubnego`}
            />
          </DialogTrigger>
        )
      })}
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "fixed z-[9998] size-full inset-0 bg-foreground/5 backdrop-blur-2xl",
            "data-[state=open]:fade-in-0 data-[state=open]:animate-in",
            "data-[state=closed]:fade-out-0 data-[state=closed]:animate-out",
          )}
        />
        <DialogContent
          className={cn(
            "fixed w-full h-full z-[9999] top-1/2 left-1/2 mt-12 -translate-x-1/2 -translate-y-1/2",
            "",
          )}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>TYTUŁ ZDJĘCIA</DialogTitle>
              <DialogDescription>OPIS ZDJĘCIA</DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <Carousel setApi={setApi}>
            <CarouselContent>
              {imageProps.map((image) => {
                return (
                  <CarouselItem
                    className="flex items-center justify-center py-spaced h-[90vh] w-full"
                    key={image.src}
                  >
                    <img
                      className="flex h-full w-full object-contain fade-in-0 animate-in duration-500"
                      src={image.src}
                      loading="lazy"
                      fetchPriority="auto"
                      srcSet={image.srcSet.attribute}
                      sizes="90vw"
                      {...image.attributes}
                      alt={""}
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="z-10000 left-8 hover:bg-background/20" />
            <CarouselNext className="z-10000 right-8 hover:bg-background/20" />
            <p className="absolute bg-background rounded-3xl font-semibold px-6 py-3 bottom-4 left-1/2 -translate-x-1/2">
              Zdjęcie {current + 1} / {count}
            </p>
            <Button
              className="absolute right-6 top-6 hover:bg-background/20"
              size="icon"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              <X />
              <span className="sr-only">Zamknij podgląd</span>
            </Button>
          </Carousel>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

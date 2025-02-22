"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import PlaylistCreateModal from "../components/playlist-create-modal";
import PlaylistsSection from "../sections/playlists-section";

const PlaylistsView = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PlaylistCreateModal onOpenChange={setIsOpen} open={isOpen} />
      <div className="max-w-[150rem] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Playlists</h1>
            <p className="text-xs text-muted-foreground mt-2">
              Collections you have created
            </p>
          </div>
          <Button
            variant={"outline"}
            size={"icon"}
            className="rounded-full"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon />
          </Button>
        </div>
        <PlaylistsSection />
      </div>
    </>
  );
};

export default PlaylistsView;

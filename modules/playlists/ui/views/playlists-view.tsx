"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import PlaylistCreateModal from "../components/playlist-create-model";
import { PlaylistSections } from "../sections/playlist-sections";

const PlayListView: React.FC = () => {
  const [createModel, setCreateModel] = useState(false);

  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <PlaylistCreateModal open={createModel} onOpenChange={setCreateModel} />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Playlists</h1>
          <p className="text-xs text-muted-foreground">
            Collections you have created
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setCreateModel(true)}
        >
          <PlusIcon />
        </Button>
      </div>
      <PlaylistSections />
    </div>
  );
};
export default PlayListView;

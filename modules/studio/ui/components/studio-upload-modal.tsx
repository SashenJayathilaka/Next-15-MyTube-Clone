"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function StudioUploadModal() {
  return (
    <Button variant="secondary">
      <PlusIcon />
      Create
    </Button>
  );
}

export default StudioUploadModal;

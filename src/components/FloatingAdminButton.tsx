import { useState } from "react";
import { Button } from "@/components/ui/button";
import { isAdminLoggedIn } from "@/lib/auth";

interface FloatingAdminButtonProps {
  onToggleEditor: () => void;
  isEditorActive: boolean;
}

const FloatingAdminButton = ({
  onToggleEditor,
  isEditorActive,
}: FloatingAdminButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Only show if admin is logged in
  if (!isAdminLoggedIn()) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50" data-editor-protected="true" />
  );
};

export default FloatingAdminButton;

export default function copyPostLink(postId: number): string {
  const link = `${window.location.origin}/postid/${postId}`;

  // Modern clipboard API (requires HTTPS and user interaction)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).catch((err) => {
      console.error("Clipboard API failed, falling back", err);
      fallbackCopy(link);
    });
    return "Copied Link";
  }

  // Fallback for older devices
  fallbackCopy(link);
  return "Copied Link";
}

// Fallback using textarea and execCommand
function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // Avoid showing it
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.setAttribute("readonly", "");

  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback copy failed", err);
    alert("Copy failed. Please copy manually.");
  }

  document.body.removeChild(textarea);
}

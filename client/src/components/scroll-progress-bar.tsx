import { useScrollProgress } from '@/hooks/use-scroll-progress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div 
      className="scroll-progress" 
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

const GoalCard: React.FC<GoalCardProps> = ({
  title,
  description,
  icon,
  onClick,
  isSelected = false,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "glass cursor-pointer p-6 rounded-2xl transition-all duration-300 border",
        isSelected
          ? "ring-2 ring-primary border-transparent shadow-lg bg-primary/10 text-primary"
          : "hover:shadow-md bg-secondary text-foreground",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={cn(
            "mb-4 p-3 rounded-full flex items-center justify-center w-12 h-12",
            isSelected
              ? "bg-primary/20 text-primary shadow-md"
              : "bg-secondary text-foreground shadow-sm"
          )}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default GoalCard;
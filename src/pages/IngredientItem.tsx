
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface IngredientItemProps {
  name: string;
  quantity: string;
  available: boolean;
  onToggle: (available: boolean) => void;
  className?: string;
}

export function IngredientItem({
  name,
  quantity,
  available,
  onToggle,
  className,
}: IngredientItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border",
        available 
          ? "border-green-200 bg-green-50/50" 
          : "border-border bg-secondary/50",
        className
      )}
    >
      <div className="flex items-center">
        <button
          onClick={() => onToggle(!available)}
          className={cn(
            "h-5 w-5 rounded flex items-center justify-center mr-3",
            available 
              ? "bg-green-500 text-white" 
              : "border border-muted-foreground"
          )}
        >
          {available && <Check className="h-3 w-3" />}
        </button>
        <div>
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground">{quantity}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        {!available && (
          <button
            onClick={() => onToggle(true)}
            className="text-xs text-primary hover:underline"
          >
            I have this
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface AlternativeIngredientProps {
  original: string;
  alternative: string;
  ratio: string;
  onAccept: () => void;
  onReject: () => void;
  className?: string;
}

export function AlternativeIngredient({
  original,
  alternative,
  ratio,
  onAccept,
  onReject,
  className,
}: AlternativeIngredientProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg border border-amber-200 bg-amber-50/50",
      className
    )}>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">Instead of</p>
            <h4 className="text-sm font-semibold">{original}</h4>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={onAccept}
              size="sm" 
              variant="outline"
              className="bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
            >
              <Check className="h-4 w-4 mr-1" /> Use this
            </Button>
            
            <Button 
              onClick={onReject}
              size="sm" 
              variant="outline"
              className="bg-red-50 border-red-200 hover:bg-red-100 text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-3 flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">Use instead</p>
            <h4 className="text-sm font-medium">{alternative}</h4>
          </div>
          <div className="text-xs px-2 py-1 bg-secondary rounded-full font-medium text-foreground">
            {ratio}
          </div>
        </div>
      </div>
    </div>
  );
}

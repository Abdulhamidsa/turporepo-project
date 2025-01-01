// YearPicker.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";

interface YearPickerProps {
  value: number | null;
  onChange: (year: number) => void;
}

export default function YearPicker({ value, onChange }: YearPickerProps) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <Select onValueChange={(val) => onChange(parseInt(val, 10))}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value ? value.toString() : "Select Year"} />
      </SelectTrigger>
      <SelectContent className="bg-card text-card-foreground max-h-60 overflow-y-auto z-50">
        {yearOptions.map((year) => (
          <SelectItem key={year} value={year.toString()} className="cursor-pointer hover:bg-muted hover:text-primary rounded px-2 py-1">
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

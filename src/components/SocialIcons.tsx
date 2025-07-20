import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// SocialIcons component
type SocialIconDetail = {
  href: string;
  label: string;
  icon: React.ReactNode;
  hoverClass?: string;
};

const SocialIcons = ({ icons }: { icons: SocialIconDetail[] }) => (
  <div className="flex gap-4">
    {icons.map(({ href, label, icon, hoverClass }) => (
      <Tooltip key={label}>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${hoverClass || ""} transition-colors`}
            aria-label={label}
          >
            {icon}
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    ))}
  </div>
);

export default SocialIcons;

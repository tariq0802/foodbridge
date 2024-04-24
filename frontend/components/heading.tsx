interface HeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="space-y-0.5">
      {icon}
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default Heading;

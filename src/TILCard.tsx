import { Link } from "@reach/router";
import { Card, CardBody, CardHeader, CardTitle, CardText } from "reactstrap";
import ShareButton from "./ShareButton";

function PreviewText({ children }: { children: string }) {
  return <>{children.trim().split("\n")[0] + ".."}</>;
}

// maybe make this an article? section?
export type TILCardProps = {
  title: string;
  children: string;
  className: string;
};

export default function TILCard({ title, children, className }: TILCardProps) {
  const encodedTitle = encodeURIComponent(title);

  return (
    <Card className={className}>
      <CardHeader tag="h2">
        <CardTitle>
          <Link to={`/entries/${encodedTitle}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardText tag="div" className="pb-2">
          <PreviewText>{children}</PreviewText>
        </CardText>
        <ShareButton />
      </CardBody>
    </Card>
  );
}

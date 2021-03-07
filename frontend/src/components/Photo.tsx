import { Card } from "react-bootstrap";
import { BASE_API_URL } from "../utils/constants";

interface Props {
  id: string;
}

function Photo({ id }: Props) {
  return (
    <Card className="photo">
      <Card.Img
        variant="top"
        src={`${BASE_API_URL}/photos/${id}`}
        alt="Photo"
      />
    </Card>
  );
}

export default Photo;

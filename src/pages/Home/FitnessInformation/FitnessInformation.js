import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "react-bootstrap";


export default function FitnessInformation() {
  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

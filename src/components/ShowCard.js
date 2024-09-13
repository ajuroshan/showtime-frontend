import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ShowCard({title, description: description, image, onClick}) {
    return (

        <Card onClick={onClick} className="h-100" style={{backgroundColor: '#0A1627'}}>
            <Card.Img
                variant="top"
                src={image}
                className="img-fluid"
                style={{height: '400px', objectFit: 'cover'}} // Ensures the image doesn't stretch
            />
            <Card.Body className="text-start text-white">
                <Card.Title className="text-start">{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
        ;
}

export default ShowCard;
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ShowCard({title, description: description, image}) {
    return (
        <Card style={{width: '18rem', backgroundColor: '#0A1627'}}>
            <Card.Img variant="top" src={image}/>
            <Card.Body className="text-start text-white">
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ShowCard;
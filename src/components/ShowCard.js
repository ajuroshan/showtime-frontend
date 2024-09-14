import Card from 'react-bootstrap/Card';
import './ShowCard.css';  // Import the custom CSS file for hover effects

function ShowCard({title, description, image, onClick}) {
    return (
        <Card
            onClick={onClick}
            className="h-100 card-hover border-0" // Add custom class for hover effect
            style={{backgroundColor: '#0A1627'}}
        >
            <Card.Img
                variant="top"
                src={image}
                className="img-fluid"
                style={{height: '400px', objectFit: 'cover'}} // Ensures the image doesn't stretch
            />
            <Card.Body className="text-start text-white">
                <Card.Title className="text-start">{title}</Card.Title>
                <Card.Text className={"small"}>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ShowCard;

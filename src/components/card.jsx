import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.content}
                </Card.Text>
                <Button variant="outline-primary">Добавить</Button>
                <Button variant={"outline-info"}>Узнать больше</Button>
            </Card.Body>
        </Card>
    );
}

export default BasicCard;
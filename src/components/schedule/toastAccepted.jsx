import React, {useEffect, useState} from 'react';
import Toast from 'react-bootstrap/Toast';

function ToastAccepted(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    useEffect(() => {
            setShow(props.show);
            if (props.name !== "") {
                const requestOptions = {
                    method: 'GET',
                    data: {},
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };
                fetch("/api/med/medicament/" + props.name, requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setName(result.name);
                        },
                        (error) => {

                        }
                    )
            }
        }, [props.name, props.show]
    )

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
                <strong className="me-auto">Успех!</strong>
            </Toast.Header>
            <Toast.Body>Препарат {name} добавлен в расписание</Toast.Body>
        </Toast>
    );
}

export default ToastAccepted;
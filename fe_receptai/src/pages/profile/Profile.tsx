import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useHistory } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';

export default function Profile() {
    const { profile } = useSelector((state: RootState) => state.auth);
    const history = useHistory();

    const edit = () =>{ 
        history.push('/app/editProfile');
      }

    return profile ? (
        <div className="d-flex justify-content-center">
            <div className="form-group">
                <div>Name</div>
                <Card>
                    <Card.Body id='Name'>{profile.name}</Card.Body>
                </Card>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary my-1"
                        onClick={edit}>
                        Edit Profile
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary my-1"
                        onClick={() => history.push('/app/editAllergens')}>
                        Edit allergens
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary my-1"
                        onClick={() => history.push('/app/editProducts')}>
                        Edit my products
                    </button>
                </div>
                </div>
        </div>
    ) : <Spinner animation="border" />;
}
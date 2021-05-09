import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { updateProfile as updateProfileRequest } from '../../api/profileApi';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function EditProfile() {
    const { profile } = useSelector((state: RootState) => state.auth);
    const history = useHistory();

    const [name, setName] = useState(profile?.name)

    function updateProfile() {
        Promise.all([
        updateProfileRequest(name as string)
        ]).then(() => {
            toast.success('Successfully updated');
            history.push('/app/profile');
          }).catch((err: AxiosError<Error>) => {
            toast.error(err);
        }
        );
    }

    return profile ? (
        <div className="d-flex justify-content-center">
            <form>
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(updateProfile)}>
                    Update Profile
                </button>
                </div>
            </form>
        </div>
    ) : <Spinner animation="border" />;
};

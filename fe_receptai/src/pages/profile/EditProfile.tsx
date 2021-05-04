import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export default function EditProfile() {
    const { profile } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState(profile?.name)
    const [email, setEmail] = useState(profile?.email)

    return (
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
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Email"
                        placeholder="Enter email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(event => undefined)}>
                    Update Profile
                </button>
                </div>
            </form>
        </div>
    );
};

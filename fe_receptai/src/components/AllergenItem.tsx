import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { deleteUserAllergen, editUserAllergen } from '../api/profileApi'
import { IAllergen } from '../pages/profile/EditAllergens'
import ConfirmModal from './ConfirmModal'

interface IAllergenItemProps {
    allergen: IAllergen;
    modalOpen: boolean;
    setModalOpen: Function;
    setUserAllergens: Function;
}

interface IEditItemSelectProps {
    allergen : IAllergen;
    editItem: Function
}

export interface IEditAllergen {
    intensity: string;
    id: number;
}


export default function AllergenItem({ allergen, modalOpen, setModalOpen, setUserAllergens }: IAllergenItemProps) {
    function deleteAllergen(id: number) {
        deleteUserAllergen(id)
            .then(() => {
                toast.success('Deleted successfully.');
                setUserAllergens((oldVal: IAllergen[]) => oldVal.filter((allergen) => allergen.id !== id));
            })
            .catch(() => toast.error('Failed to delete'));
        setModalOpen(false);
    }
    
    function editAllergen(editAllergen: IEditAllergen) {
        
        editUserAllergen(editAllergen.id, editAllergen)
            .then(() => {
                toast.success('Updated successfully');
                setUserAllergens((oldVal: IAllergen[]) => (oldVal.map(allergen => {
                    if (allergen.id === editAllergen.id) return {...allergen, intensity: editAllergen.intensity};
                    else return allergen ;
                })));
            })
            .catch(() => toast.error('Failed to edit'));
        setEditingItem(false);
    }
    
    const [editingItem, setEditingItem] = useState<boolean>(false)
    return (
        <>
            <ConfirmModal 
            message="Do you want to delete this allergen?"
            onConfirm={() => deleteAllergen(allergen.id as number)}
            show={modalOpen}
            setShow={setModalOpen}
            />
            <tr key={allergen.id}>
                <td>{allergen.name}</td>
                <td>{editingItem ? (<EditItemSelect allergen={allergen} editItem={editAllergen} />) : allergen.intensity}</td>
                <td>
                    <Button variant="primary" onClick={() => setEditingItem(true)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => setModalOpen(true)}>Delete</Button>
                </td>
            </tr>
        </>
    )
}

function EditItemSelect({ allergen, editItem }: IEditItemSelectProps) {

    return (
        <Form.Control defaultValue={allergen.intensity} onChange={(e) => editItem({id: allergen.id, intensity: e.target.value})} as="select">
            <option value="weak">weak</option>
            <option value="high">high</option>
        </Form.Control>
    );
}
import React from 'react'
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';


const UpdateProduct = () => {
    return (
        <div>
            <MDBRow className="mb-3">
                <MDBCol>
                    <MDBInput
                        type="text"
                        label="Yeni Stok"
                        name=""
                    />
                </MDBCol>
                <MDBCol>
                    <MDBBtn className='me-5' color='warning'>
                        Güncelle
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
        </div >
    )
}

export default UpdateProduct
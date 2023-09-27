import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const UpdateProduct = () => {
    return (
        <div>
            <MDBRow className="mb-3">
                <MDBCol>
                    <MDBInput
                        type="text"
                        label="Yeni Stok"
                        name="newStock"
                        value={newStock}
                        onChange={handleStockChange}
                    />
                </MDBCol>
                <MDBCol>
                    <MDBBtn className='me-5' color='warning' onClick={handleUpdateClick}>
                        Güncelle
                    </MDBBtn>
                    <MDBBtn color='secondary' onClick={onClose}>
                        İptal
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default UpdateProduct;
import React from 'react'
import '../Style/App.scss'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Login = () => {
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0" style={{ fontSize: '30px', fontFamily: 'cursive' }}>GİRİŞ YAPIN</p>
          </div>
          <MDBInput wrapperClass='mb-4' label='Kullanıcı Adı' id='formControlLg' type='email' size="lg" />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />
          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Giriş Yap</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Login
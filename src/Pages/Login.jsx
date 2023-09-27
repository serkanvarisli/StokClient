import React, { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      // API endpoint'i ve kullanıcı bilgilerini burada ayarlayın
      const apiUrl = 'https://localhost:7031/api/login';
      const { username, password } = formData;

      // API isteği gönder
      const response = await axios.post(apiUrl, {
        username,
        password,
      });

      // API yanıtını işle
      if (response.status === 200) {
        // Başarılı giriş
        console.log('Giriş başarılı.');
        // Giriş başarılı ise isLoggedIn durumunu güncelle
      } else {
        // Başarısız giriş
        console.log('Kullanıcı adı veya şifre hatalı.');
      }
    } catch (error) {
      console.error('API Hatası:', error);
    }
  };
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
          <MDBInput wrapperClass='mb-4' label='Kullanıcı Adı' id='username' type='text' size="lg" name="username" onChange={handleChange} value={formData.username} />
          <MDBInput wrapperClass='mb-4' label='Şifre' id='password' type='password' size="lg" name="password" onChange={handleChange} value={formData.password} />
          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin}>Giriş Yap</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;

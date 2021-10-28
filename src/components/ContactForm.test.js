import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    //Arrange:render our app
    render( <ContactForm />)
    //Act: Find our elements
    //Assert
});

test('renders the contact form header', ()=> {
     //Arrange:render our app
     render( <ContactForm />)
     //Act: Find our elements
     const headerText= screen.getByText(/Contact Form/i)
     //Assert
     expect(headerText).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
     //Arrange:render our app
     render( <ContactForm />)
     //Act: Find our elements
    const firstNameInput = screen.getByPlaceholderText(/edd/i) 
    userEvent.type(firstNameInput, "Joe");
    const errorMessage = screen.getByText(/Error: firstName must have at least 5 characters./i)
   
     //Assert
     expect(errorMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange:render our app
    render( <ContactForm />)
    //Act: Find our elements
    const submitBtn= screen.getByRole(/button/i)
    userEvent.click(submitBtn);

    const errorMessage1 =  await screen.findByText(/Error: firstName must have at least 5 characters./i);
    const errorMessage2 =  await screen.findByText(/Error: lastName is a required field./i);
    const errorMessage3 =  await screen.findByText(/Error: email must be a valid email address./i);

    //Assert
    expect(errorMessage1).toBeInTheDocument();
    expect(errorMessage2).toBeInTheDocument();
    expect(errorMessage3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
     //Arrange:render our app
     render( <ContactForm />)
     //Act: Find our elements     
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstNameInput, "Jimmy");

    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastNameInput, "Hollister");

    const submitBtn= screen.getByRole(/button/i)
    userEvent.click(submitBtn);

    const errorMessage3 =  await screen.findByText(/Error: email must be a valid email address./i);

    //Assert
    expect(errorMessage3).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
     //Arrange:render our app
     render( <ContactForm />)
     //Act: Find our elements 
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    userEvent.type(emailInput, "testemail.oops");

    const errorMessage3 =  await screen.findByText(/Error: email must be a valid email address./i);

    //Assert
    expect(errorMessage3).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //Arrange:render our app
    render( <ContactForm />)
    //Act: Find our elements     
   const firstNameInput = screen.getByPlaceholderText(/edd/i);
   userEvent.type(firstNameInput, "Jimmy");

   const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "testemail@gmail.com");

    const submitBtn= screen.getByRole(/button/i)
   userEvent.click(submitBtn);

   const errorMessage2 =  await screen.findByText(/Error: lastName is a required field./i);

    //Assert
   expect(errorMessage2).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        //Arrange:render our app
        render( <ContactForm />)

        //Act: Find our elements     
       const firstNameInput = screen.getByPlaceholderText(/edd/i);
       userEvent.type(firstNameInput, "Jimmy");
   
       const lastNameInput = screen.getByPlaceholderText(/burke/i);
       userEvent.type(lastNameInput, "Hollister");
   
       const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
       userEvent.type(emailInput, "testemail@gmail.com");
   
       const submitBtn= screen.getByRole(/button/i)
       userEvent.click(submitBtn);
   
       //Assert
       const firstNameRendered = await screen.findByTestId(/firstnameDisplay/i);
       expect(firstNameRendered).toBeInTheDocument();

        const lastNameRendered = await screen.findByTestId(/lastnameDisplay/i);
        expect(lastNameRendered).toBeInTheDocument();
       const emailRendered = await screen.findByTestId(/emailDisplay/i);
        expect(emailRendered).toBeInTheDocument();
       const messageRendered = screen.queryByTestId(/messageDisplay/i)
       expect(messageRendered).toBeNull();
});

test('renders all fields text when all fields are submitted.', async () => {
     //Arrange:render our app
     render( <ContactForm />)

     //Act: Find our elements     
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstNameInput, "Jimmy");

    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastNameInput, "Hollister");

    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "testemail@gmail.com");

    const messageInput = screen.getByLabelText(/Message/i)
    userEvent.type(messageInput, "Hello World");

    const submitBtn= screen.getByRole(/button/i)
    userEvent.click(submitBtn);

    //Assert
    //Await only needs to happen once, so the following elements do not need await
    const firstNameRendered = await screen.findByTestId(/firstnameDisplay/i);
    expect(firstNameRendered).toBeInTheDocument();
    
    const lastNameRendered = screen.getByTestId(/lastnameDisplay/i);
    expect(lastNameRendered).toBeInTheDocument();
    const emailRendered = screen.getByTestId(/emailDisplay/i);
    expect(emailRendered).toBeInTheDocument();
    const messageRendered = screen.queryByTestId(/messageDisplay/i)
    expect(messageRendered).toBeInTheDocument();

});

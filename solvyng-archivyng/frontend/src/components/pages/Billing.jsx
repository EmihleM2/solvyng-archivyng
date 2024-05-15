import React, { useState, useEffect } from 'react';
import './styling/billing.css';
import { useNavigate } from 'react-router-dom'
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { fetchUserAttributes } from 'aws-amplify/auth';

const Billing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const client = generateClient();

  return (
    <><h1>Billing Page</h1><div>
    </div></>
  );
};

export default Billing;


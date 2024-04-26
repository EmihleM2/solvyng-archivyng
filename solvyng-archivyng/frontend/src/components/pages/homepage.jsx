// import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
// import { signOut } from 'aws-amplify/auth';
// import { useNavigate } from 'react-router-dom';
// import { SubscribeCommand } from "@aws-sdk/client-sns";
import AWS from 'aws-sdk'
// import { snsClient } from "./libs/snsClient.js";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate()

  AWS.config.update({
    region: 'eu-west-1',
    accessKeyId: 'AKIAWUTJI5P3O3ER4UWG',
    secretAccessKey: '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',
  });

  const sns = new AWS.SNS();

  const publishToTopic = () => {
    const publishParams = {
      Message: 'Hello from React!',
      TopicArn: 'arn:aws:sns:eu-west-1:456561060854:solvyng-archivyng'
    };
  
    sns.publish(publishParams, (err, data) => {
      if (err) {
        console.error(err, data);
      } else {
        console.log(`Published message to: ${publishParams.TopicArn}`);
      }
    });
  };
  
const subscribeToTopic = () => {
  const params = {
    Protocol: "email",
    TopicArn: 'arn:aws:sns:eu-west-1:456561060854:solvyng-archivyng',
    Endpoint: 'tumiso@solvyng.io',
  };

  sns.subscribe(params, (err, data) => {
    if (err) {
      console.error(err, data);
    } else {
      console.log(`Subscribed email to topic: ${params.TopicArn}`);
    }
  });
};

  async function handleSignOut() {
    try {
      await signOut()
      console.log("Logout works");
      navigate("/login");
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <><h1>Landing Page</h1><div>
      <button type="submit" className="button-landpage" onClick={handleSignOut}> Log Out </button>
      <button type="submit" className="button-landpage" onClick={subscribeToTopic}> Subscribe </button>
      <button type="submit" className="button-landpage" onClick={publishToTopic}> Publish </button>
    </div></>
   );
};

export default HomePage;

import React, { useState } from "react";
import 'animate.css';
import '@ant-design/v5-patch-for-react-19';
import { Button, Card, Empty, Form, InputNumber, message, Select, Tooltip } from "antd";
import { Copy } from "lucide-react";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";



const App = () => {

  const [payload,setPayload] = useState('')

  const generateUser = () =>{

    return {
      id:nanoid(),
      fullName:faker.person.fullName(),
      mobile:faker.phone.number({ style: 'international' }),
      email:faker.internet.email(),
      gender:faker.person.gender(),
      address:faker.location.streetAddress({ useFullAddress: true }),
      city:faker.location.city() ,
      state:faker.location.state(),
      country:faker.location.country(),
      pincode:faker.location.zipCode(),
      createdAt:faker.date.anytime()
    }

  }

    const generateProduct = () =>{

    return {
      id:nanoid(),
     title: faker.commerce.product(),
     description: faker.commerce.productDescription(),
     price: faker.commerce.price(),
     discount: faker.commerce.price({ min: 0, max: 100 }),
     rating: faker.commerce.price({ min: 1, max: 5 }),
     category: faker.commerce.productAdjective(),
     brand: faker.company.buzzNoun(),
     image: faker.image.urlLoremFlickr({ category: 'nproductature' }),
     createdAt:faker.date.anytime()
    }

  }

  const generateData = (values) =>{

    const temp = []

    for(let i=0; i<values.noofdata; i++)
    {
    if(values.type === "users")
    {
     temp.push(generateUser())
    }
    if(values.type === "products")
    {
     temp.push(generateProduct())
    }
    }
    console.log(temp)
    const str = JSON.stringify(temp,null,4)
     setPayload(str)

  }
  const onCopy = () =>{
   navigator.clipboard.writeText(payload)
   message.success("Data Copied")
  }


  return(
  <div className="bg-gray-100 min-h-screen py-10"> 
    <div className="w-9/12 mx-auto flex flex-col gap-12">
     <div className="text-center">
       <h1 className="text-3xl font-bold">Fake json Generator</h1>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident consequatur maxime laudantium itaque sit, fugiat aliquid aut nulla ex nobis suscipit facere adipisc</p>
     </div>
     
     <Card>
       <Form className="flex gap-8" layout="vertical" onFinish={generateData} initialValues={{
        type:"users",
        noofdata:24
        
        }}>
         <Form.Item
           label="Choose Json Type"
           name="type"
           rules={[{required:true}]}
           className="w-full"
         >
            <Select size="large" placeholder="Choose Data">
              <Select.Option value="products">Products</Select.Option>
              <Select.Option value="users">Users</Select.Option>
              <Select.Option value="payments">Payments</Select.Option>
              <Select.Option value="employees">Employees</Select.Option>
            </Select>
         </Form.Item>
         <Form.Item
          label="Number of Date"
          name="noofdata"
          rules={[{required:true}]}
          className="!w-full"
         >
          <InputNumber 
          size="large"
          placeholder="Enter Number of data"
          className="!w-full"
          max={100}
          />
         </Form.Item>
         <Form.Item
         label=" "
         >
          <Button htmlType="submit" size="large" type="primary">Generate</Button>
         </Form.Item>
       </Form>
       
     </Card>
     {
      payload.length === 0 ?
      <Empty description="Click Generate Button To Generate Json !" />
      :
     <Card title="Users" extra={
      <Tooltip>
        <Copy onClick={onCopy} />
      </Tooltip>
     }>

       <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
        {payload}
      </SyntaxHighlighter>
      
     </Card>

    }

    </div>
  </div>
  )

}

export default App
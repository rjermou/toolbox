import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";


function Search() {

  const [fileName, setFileName] = useState("");
  const [data, setData] = useState([]);
  const handleChange = event => {
    setFileName(event.target.value);
   };

  const fetchData = (fileName) => {
    let url = process.env.REACT_APP_MS_FILES_URL + '/files/data';
    if (fileName) {
      url = url + '?fileName=' + fileName + ".csv";
    }
    fetch(url)
      .then((response) => response.json())
      .then((actualData) => {
        let filesArr = [];
        actualData.map((item)=>{
          item.lines.map((itemContent)=>{
            const fileItem = {
              fileName: item.file,
              text: itemContent.text,
              number: itemContent.number,
              hex: itemContent.hex
            }
            filesArr.push(fileItem);
          })
        });
        setData(filesArr);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData(fileName);
  }, [fileName]);


  return (
    <>
    <Card style={{backgroundColor: '#e9ecef'}}>
      <Card.Body>
        <Card.Title>Files</Card.Title>
      </Card.Body>
    </Card>
    <Card style={{ width: '30rem', margin: 20}} className="mx-auto" >
      <Card.Body>
        <Form.Group className="mb-3" style={{ padding: 0 }} >
          <InputGroup className="mb-3">
            <InputGroup.Text >File Name</InputGroup.Text>
              <Form.Control aria-label="Write the File Name"
                value={fileName}
                onChange={handleChange}/>
            <InputGroup.Text>.csv</InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Card.Body>
    </Card>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.fileName}</td>
            <td>{item.text}</td>
            <td>{item.number}</td>
            <td>{item.hex}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
}

export default Search;
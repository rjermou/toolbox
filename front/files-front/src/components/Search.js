import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFilesList } from '../store/slices/files';
import { getFilesData } from '../data/data';


function Search() {

  const { data } = useSelector(state => state.files);
  const [fileName, setFileName] = useState("");

  const handleChange = event => {
    setFileName(event.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const files = await getFilesData(fileName);
      const dataNew = Object.assign({}, {
        list: files,
        filter: fileName
      });
      dispatch(setFilesList(dataNew));
     }
     fetchData();
  }, [dispatch, fileName])

  return (
    <>
      <Card style={{ width: '30rem', margin: 20}} className="mx-auto" >
        <Card.Body>
          <Form.Group className="mb-3" style={{ padding: 0 }} >
            <InputGroup className="mb-3">
              <InputGroup.Text >File Name</InputGroup.Text>
                <Form.Control aria-label="Write the File Name"
                  value={fileName}
                  onChange={handleChange}
                  />
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
        {(data!=null)?data.list.map((item, index) => (
          <tr key={index}>
            <td>{item.fileName}</td>
            <td>{item.text}</td>
            <td>{item.number}</td>
            <td>{item.hex}</td>
          </tr>
        )):[]}
        </tbody>
      </Table>
    </>
  );
}

export default Search;
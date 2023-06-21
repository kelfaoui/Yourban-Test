import { React, useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Button,
} from "@chakra-ui/react";

export default function SimpleTable() {
  const [data, setData] = useState();
  const [del, setDel] = useState(false);
  const getData = () => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  };

  const deleteRow = (id) => {
    var url = `http://localhost:5000/commerces/delete/${id}`;
    axios
      .delete(url)
      .then((res) => {
        axios
          .get("http://localhost:5000/")
          .then((res) => {
            setData(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [data]);
  if (data)
    return (
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Liste des magasins</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Etablissement type</Th>
              <Th>Etablissement</Th>
              <Th>Location</Th>
              <Th>Address</Th>
              <Th>Opérations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data?.map((i) => {
              return (
                <Tr>
                  <Td>{i.id}</Td>
                  <Td>{i.etablissement_type}</Td>
                  <Td>{i.etablissement}</Td>
                  <Td>{i.location}</Td>
                  <Td>{i.address}</Td>
                  <Td>
                    <Stack spacing={4} direction="row" align="center">
                      <Button>
                        <FaEdit></FaEdit>
                      </Button>
                      <Button onClick={() => deleteRow(i.id)}>
                        <FaTrash></FaTrash>
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
              <Th>Etablissement type</Th>
              <Th>Etablissement</Th>
              <Th>Location</Th>
              <Th>Address</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    );
}

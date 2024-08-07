import { useState, useEffect } from "react";
import {
  Form,
  Modal,
  Button,
  Card,
  ToastContainer,
  Toast,
  Container,
  Navbar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Data bukan array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price, 10),
          stock: parseInt(formData.stock, 10),
        }),
      });
      const resJson = await res.json();
      if (res.ok) {
        setFormData({
          name: "",
          price: "",
          stock: "",
          description: "",
          image: "",
        });
        setMessage("Produk berhasil dibuat");
        setToastMessage("Produk berhasil dibuat");
        setShowToast(true);
        setProducts((prev) => [...prev, resJson.data]);
      } else {
        const errorRes = await res.json();
        setMessage(`Error: ${errorRes.message || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    fetch(`/api/products/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setProducts((prev) => prev.filter((product) => product.id !== id));
        } else {
          console.log("Delete gagal");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Container fluid className="overflow-x-hidden">
        <Modal
          show={show}
          onHide={() => setShow(false)}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Buat Produk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {["name", "price", "stock", "description", "image"].map(
                (field, idx) => (
                  <Form.Control
                    key={idx}
                    className="p-2 mb-2"
                    type={
                      field === "price" || field === "stock"
                        ? "text"
                        : field === "description"
                        ? "textarea"
                        : "text"
                    }
                    name={field}
                    value={formData[field]}
                    placeholder={`Masukkan ${
                      field === "name"
                        ? "Nama produk"
                        : field === "price"
                        ? "Harga produk"
                        : field === "stock"
                        ? "Stok produk"
                        : field === "description"
                        ? "Deskripsi produk"
                        : "URL gambar produk"
                    }`}
                    onChange={handleFormChange}
                    rows={field === "description" ? 4 : undefined}
                    inputMode={
                      field === "price" || field === "stock"
                        ? "numeric"
                        : undefined
                    }
                  />
                )
              )}
              <Button variant="primary" type="submit">
                Buat
              </Button>
              <div className="message">{message && <p>{message}</p>}</div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="row">
          <div className="col-3 bg-dark">
            <div className="row mb-2 mt-2">
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand className="text-center">
                    Edit Product
                  </Navbar.Brand>
                </Container>
              </Navbar>
            </div>
            <div className="row overflow-y-auto">
              <form onSubmit={handleSubmit}>
                {["name", "price", "stock", "description", "image"].map(
                  (field, idx) => (
                    <Form.Control
                      key={idx}
                      className="p-2 mb-2"
                      type={
                        field === "price" || field === "stock"
                          ? "text"
                          : field === "description"
                          ? "textarea"
                          : "text"
                      }
                      name={field}
                      value={formData[field]}
                      placeholder={`Masukkan ${
                        field === "name"
                          ? "Nama produk"
                          : field === "price"
                          ? "Harga produk"
                          : field === "stock"
                          ? "Stok produk"
                          : field === "description"
                          ? "Deskripsi produk"
                          : "URL gambar produk"
                      }`}
                      onChange={handleFormChange}
                      rows={field === "description" ? 4 : undefined}
                      inputMode={
                        field === "price" || field === "stock"
                          ? "numeric"
                          : undefined
                      }
                    />
                  )
                )}
                <Button variant="primary" type="submit">
                  Buat
                </Button>
                <div className="message">{message && <p>{message}</p>}</div>
              </form>
            </div>
          </div>
          <div className="col-9">
            <div className="row mt-2">
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <Button variant="primary" onClick={() => setShow(true)}>
                      Buat Produk
                    </Button>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center m-1 p-1">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Card
                      key={product.id}
                      style={{ width: "15rem" }}
                      className="m-1"
                    >
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <div className="d-flex">
                          <Card.Text>Qty: {product.stock}</Card.Text>
                          <Card.Text variant="primary">
                            Rp. {product.price}
                          </Card.Text>
                        </div>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => handleDelete(product.id)}
                        >
                          Edit
                        </Button>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>Tidak ada produk yang tersedia</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          className="p-3"
          position="top-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            autohide
            delay={3000}
          >
            <Toast.Header>
              <strong className="me-auto">Notifikasi</strong>
              <small>Baru saja</small>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
}

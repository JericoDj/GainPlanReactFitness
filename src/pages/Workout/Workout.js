import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { WorkoutContext } from "../../context/WorkoutContext";
import { UserContext } from "../../context/UserContext";
import "./Workout.css";

export default function Workout() {
  const { workout, fetchWorkout } = useContext(WorkoutContext);
  const { user } = useContext(UserContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: "", duration: "" });
  const [adding, setAdding] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedWorkoutId(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (workout) => {
    setEditingWorkout({ ...workout });
    setShowEditModal(true);
  };

  const handleUpdateWorkout = async () => {
    setUpdating(true);
    try {
      const response = await fetch(
        `https://fitness-app-api-j7a0.onrender.com/workouts/updateWorkout/${editingWorkout._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: editingWorkout.name,
            duration: editingWorkout.duration,
            status: editingWorkout.status,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      setShowEditModal(false);
      fetchWorkout();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `https://fitness-app-api-j7a0.onrender.com/workouts/deleteWorkout/${selectedWorkoutId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }
      setShowDeleteModal(false);
      fetchWorkout();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleMarkComplete = async (id, name, duration) => {
    setUpdatingStatusId(id);
    try {
      await fetch(
        `https://fitness-app-api-j7a0.onrender.com/workouts/updateWorkout/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ name, duration, status: "completed" }),
        }
      );
      fetchWorkout();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleAddWorkout = async () => {
    setAdding(true);
    try {
      const response = await fetch(
        "https://fitness-app-api-j7a0.onrender.com/workouts/addWorkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            userId: user.id,
            name: newWorkout.name,
            duration: newWorkout.duration,
            status: "pending",
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error("Create failed:", result);
        return;
      }

      setShowAddModal(false);
      setNewWorkout({ name: "", duration: "" });
      fetchWorkout();
    } catch (err) {
      console.error("Create error:", err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Container className="workout-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My Workouts</h3>
        <Button className="btn-brand" onClick={() => setShowAddModal(true)}>
          + Add Workout
        </Button>
      </div>

      <Row>
        {Array.isArray(workout) && workout.length > 0 ? (
          workout.map((item) => (
            <Col md={6} lg={4} key={item._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{item.name || "Untitled Workout"}</Card.Title>
                  <Card.Text>
                    <strong>Duration:</strong> {item.duration}
                    <br />
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        item.status === "completed"
                          ? "badge custom-badge"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {item.status}
                    </span>
                    <br />
                    <strong>Date:</strong>{" "}
                    {new Date(item.dateAdded).toLocaleDateString()}
                  </Card.Text>

                  {item.status === "pending" && (
                    <Button
                      className="btn-success-brand btn-sm me-2"
                      onClick={() =>
                        handleMarkComplete(item._id, item.name, item.duration)
                      }
                      disabled={updatingStatusId === item._id}
                    >
                      {updatingStatusId === item._id
                        ? "Updating..."
                        : "Mark as Completed"}
                    </Button>
                  )}

                  <Button
                    className="btn-secondary-brand btn-sm me-2"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    className="btn-light-brand btn-sm"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No workouts found.</Alert>
          </Col>
        )}
      </Row>

      {/* Modals */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this workout?</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-light-brand"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button className="btn-secondary-brand" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingWorkout && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editingWorkout.name}
                  onChange={(e) =>
                    setEditingWorkout({
                      ...editingWorkout,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  value={editingWorkout.duration}
                  onChange={(e) =>
                    setEditingWorkout({
                      ...editingWorkout,
                      duration: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editingWorkout.status}
                  onChange={(e) =>
                    setEditingWorkout({
                      ...editingWorkout,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-light-brand"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn-brand"
            onClick={handleUpdateWorkout}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                value={newWorkout.name}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, name: e.target.value })
                }
                placeholder="e.g., Morning Jog"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration (e.g., 30 mins)</Form.Label>
              <Form.Control
                type="text"
                value={newWorkout.duration}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, duration: e.target.value })
                }
                placeholder="e.g., 45 mins"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-light-brand"
            onClick={() => setShowAddModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn-brand"
            onClick={handleAddWorkout}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add Workout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

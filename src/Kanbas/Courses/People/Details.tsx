import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const [emailEditing, setEmailEditing] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email: email, role: role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    setEmailEditing(false);
    setSelecting(false);
    navigate(-1);
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(user.firstName + " " + user.lastName);
    setEmail(user.email)
    setRole(user.role);
  };
  useEffect(() => {
    if (uid) fetchUser();
    setEditing(false);
    setEmailEditing(false);
    setSelecting(false);
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />

      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && (
          <input className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>

      <div className="text-danger fs-5">
        {!emailEditing && (
          <FaPencil onClick={() => setEmailEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {emailEditing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!emailEditing && (
          <div className="wd-email"
               onClick={() => setEmailEditing(true)}>
            <b>Email: </b>{user.email}</div>)}
        {user && emailEditing && (
          <span>
            <b>Email: </b>
            <input className="form-control w-50 wd-edit-email"
              defaultValue={`${user.email}`}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { saveUser(); }}}/>
          </span>
        )}
      </div>
      
      <div className="text-danger fs-5">
        {!selecting && (
          <FaPencil onClick={() => setSelecting(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {selecting && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!selecting && (
          <div className="wd-roles"
               onClick={() => setSelecting(true)}>
            <b>Roles: </b>{user.role}</div>)}
        {user && selecting && (
          <span>
            <b>Roles: </b>
            <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="form-select w-25 wd-select-role" >
              <option value="">All Roles</option>    <option value="STUDENT">Students</option>
              <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrators</option>
            </select>
          </span>
        )}
      </div> 

      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
    </div>
); }
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import ProtectedRouteFaculty from "../../Account/ProtectedRouteFaculty";
export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
  moduleId: string; deleteModule: (moduleId: string) => void; 
  editModule: (moduleId: string) => void }) {
  return (
    <div className="float-end">
      <ProtectedRouteFaculty><FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" /></ProtectedRouteFaculty>
      <ProtectedRouteFaculty><FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/></ProtectedRouteFaculty>
      <GreenCheckmark />
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
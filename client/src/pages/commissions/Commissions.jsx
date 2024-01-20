import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Commissions.scss";
import AddCommission from "../../components/crudCommission/addCommission/AddCommission.jsx";
import { UserContext } from "../../contexts/user.context.jsx";
// C:\Users\A\Circo\client\src\components\crudCommission\addCommission\AddCommission.jsx
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function Commissions() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [showAddCommissionForm, setShowAddCommissionForm] = useState(false);

  const fetchCommissions = async () => {
    console.log("Getting all store items");
    try {
      const response = await axios.get(
        `http://localhost:3000/commissions/talent/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCommission = async (files, inputs) => {
    try {
      // Step 2: Post image to url2
      const uploadFiles = async () => {
        let imagePaths = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          try {
            const res1 = await axios.post(
              "http://localhost:3000/commissions/upload",
              formData,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            imagePaths.push(res1.data.url);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
        return imagePaths;
      };

      const uploadFilesAndCreateArtwork = async () => {
        try {
          let imagePaths = await uploadFiles();

          inputs.images = imagePaths;
          inputs.forSelling = true;

          const res2 = await axios.post(
            "http://localhost:3000/commissions/",
            inputs,
            {
              withCredentials: true,
            }
          );

          console.log("Commission Data:", res2.data);
          return res2.data;
        } catch (error) {
          console.error("Error:", error);
          // Handle the error as needed
        }
      };

      // Await the result of uploadFilesAndCreateArtwork
      const output = await uploadFilesAndCreateArtwork();
      console.log("Output", output);
      return output;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const { data: commissions, isLoading } = useQuery({
    queryKey: ["commissions"],
    queryFn: fetchCommissions,
  });

  const mutation = useMutation({
    mutationFn: handleAddCommission,
    onSuccess: async () => {
      // Invalidate and refetch
      alert("Handle submit in parent component");
      await queryClient.invalidateQueries({ queryKey: ["commissions"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="commissions">
      <h3 className="profile-page__header">
        Commissions ({commissions.length})
        {user?._id == id && (
          <button
            className="btn btn-1 add-btn"
            onClick={() => {
              setShowAddCommissionForm(true);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </h3>
      <div className="commission-container">
        {commissions.length > 0 ? (
          commissions.map((commission) => {
            return (
              <div className="commission-item">
                <div className="commission-item__sample-container">
                  {/* {commission.images.map((image) => {
                  return  (<img
                  src={`../../public/uploads/commissions/${image[0]}`}
                  alt=""
                  className="commission-item__sample-item large"
                />)
                })} */}
                  <img
                    src={`../../public/uploads/commissions/${commission.images[0]}`}
                    alt=""
                    className="commission-item__sample-item large"
                  />
                  <div>
                    <img
                      src={`../../public/uploads/commissions/${commission.images[1]}`}
                      alt=""
                      className="commission-item__sample-item"
                    />
                    <img
                      src={`../../public/uploads/commissions/${commission.images[2]}`}
                      alt=""
                      className="commission-item__sample-item"
                    />
                  </div>
                </div>
                <div className="commission-item__details">
                  <h2 className="commission-item__details__header">
                    {commission.title}
                  </h2>
                  {commission.materials?.length > 0 && (
                    <p>
                      <strong>Materials: </strong>
                      {commission.materials.join(",")}
                    </p>
                  )}

                  {commission.fields?.length > 0 && (
                    <p>
                      <strong>Fields: </strong>
                      {commission.fields.map((field) => {
                        return <>{field.name + ", "}</>;
                      })}
                    </p>
                  )}
                  <span className="extra-msg gray italic">
                    *Notes: {commission.note}
                  </span>
                  <br></br>
                  <button className="btn btn-3 commission-item__book-btn">
                    Book commission
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>The artist has not uploaded any commissions yet.</p>
        )}
      </div>

      {/* Modal forms */}
      {showAddCommissionForm && (
        <AddCommission
          setShowAddCommissionForm={setShowAddCommissionForm}
          handleAddCommission={handleAddCommission}
          mutation={mutation}
        />
      )}
    </div>
  );
}

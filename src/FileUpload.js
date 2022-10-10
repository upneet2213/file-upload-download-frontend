import React, { useEffect, useRef, useState } from "react";

const FileUpload = ({ user, setUser }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInput = useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/uploads/${user.email}`
      );
      return response;
    }
    fetchData().then((res) => {
      if (res.status !== 500) {
        res.json().then((items) => {
          setUploadedFiles(items);
        });
      }
    });
    //eslint-disable-next-line
  }, []);

  const downloadFile = async (file) => {
    try {
      const response = await fetch(
        `http://localhost:3000/uploads/download/${file}`
      );
      if (response.status === 200 || response.status === 201) {
        const data = await response.blob();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      } else {
        alert("failed to download file");
      }
    } catch (e) {
      console.log(e);
      alert("something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(fileInput.current);

    try {
      const response = await fetch(
        `http://localhost:3000/uploads/upload/${user.email}`,
        {
          body: formData,
          method: "POST",
          dataType: "JsonP",
        }
      );
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        console.log(data);
        setUploadedFiles([...uploadedFiles, data]);
        alert("file upload successful");
      } else {
        alert("failed to upload file");
      }
    } catch (e) {
      // console.log(e);
      alert("something went wrong");
    }
  };
  return (
    <div className="mt-8 overflow-auto">
      <form onSubmit={(e) => handleSubmit(e, this)} ref={fileInput}>
        <input
          type="file"
          name="file"
          className="w-2/3 border border-black p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 ml-5 text-white rounded px-10 py-3"
        >
          Submit
        </button>
      </form>

      <div>
        {uploadedFiles?.map((file) => {
          return (
            <div
              key={file.filename}
              className="bg-gray-200 w-72 h-10 border-gray cursor-pointer my-5 mx-auto flex items-center justify-center rounded-sm "
              onClick={() => {
                downloadFile(file.filename);
              }}
            >
              {file.originalname}
            </div>
          );
        })}
      </div>
      <button
        className="px-10 py-3 bg-red-500 text-white mt-20 rounded"
        onClick={() => setUser({})}
      >
        Log Out
      </button>
    </div>
  );
};

export default FileUpload;

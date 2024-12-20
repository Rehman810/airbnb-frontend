import React, { useState } from "react";
import { Dropzone } from "@files-ui/react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "../../context/context";

const ImageUploader = () => {
  const [files, setFiles] = useState([]);
  const { setUploadedImages } = useAppContext();
  
  const updateFiles = (incomingFiles) => {
    const newFiles = incomingFiles.slice(0, 6); 
    setFiles(newFiles);
    setUploadedImages(newFiles);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: "600px", margin: "auto", p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Choose at least 3 photos
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "#757575" }}>
        Drag to reorder
      </Typography>

      <Dropzone
        onChange={updateFiles}
        value={files}
        accept="image/*"
        maxFiles={6}
        minFiles={3}
        label="Drag and drop your photos here"
        uploadingMessage="Uploading..."
        footer={false}
      >
        {files.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {files[0] && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ddd",
                  }}
                >
                  <img
                    src={files[0].preview || URL.createObjectURL(files[0].file)}
                    alt="cover-photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    Cover Photo
                  </Typography>
                  <IconButton
                    onClick={() => removeFile(0)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            )}

            {files.slice(1).map((file, index) => (
              <Grid item xs={6} key={index + 1}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ddd",
                  }}
                >
                  <img
                    src={file.preview || URL.createObjectURL(file.file)}
                    alt={`uploaded-${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => removeFile(index + 1)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}

            {Array.from({ length: 6 - files.length }).map((_, i) => (
              <Grid item xs={6} key={`placeholder-${i}`}>
                <Box
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                    fontSize: "14px",
                  }}
                >
                  Add more
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
              fontSize: "14px",
            }}
          >
            Drag and drop photos here
          </Box>
        )}
      </Dropzone>
    </Box>
  );
};

export default ImageUploader;

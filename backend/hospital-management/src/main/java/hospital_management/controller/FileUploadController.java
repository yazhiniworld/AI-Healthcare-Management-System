package hospital_management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
public ResponseEntity<String> uploadFile(
        @RequestParam("file") MultipartFile file
) {

    try {

        File dir = new File(UPLOAD_DIR);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName =
                System.currentTimeMillis()
                + "_"
                + file.getOriginalFilename();

        Path path =
                Paths.get(UPLOAD_DIR + fileName);

        Files.write(path, file.getBytes());

        return ResponseEntity.ok(fileName);

    } catch (Exception e) {

        return ResponseEntity
                .badRequest()
                .body("Upload Failed");
    }
}
}
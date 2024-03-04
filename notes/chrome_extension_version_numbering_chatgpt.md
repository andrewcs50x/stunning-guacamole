Incrementing the version number of a Chrome extension involves updating the `version` field in the extension's `manifest.json` file. This version number should follow the [semantic versioning](https://semver.org/) scheme (`MAJOR.MINOR.PATCH`), where you increment the:
- `MAJOR` version when you make incompatible API changes,
- `MINOR` version when you add functionality in a backward-compatible manner, and
- `PATCH` version when you make backward-compatible bug fixes.

Here's how to increment the version number and update your GitHub repository:

1. **Edit the `manifest.json` File**:
   - Open your `manifest.json` file in a text editor.
   - Find the `version` key and update its value to the new version number. For example, if your current version is "1.0.0" and you're adding new functionality without breaking backward compatibility, you would change it to "1.1.0".

2. **Commit the Change**:
   - After saving your changes to `manifest.json`, use Git to stage and commit the updated file. Open a terminal or command prompt, navigate to your extension's directory, and run:
     ```sh
     git add manifest.json
     git commit -m "Increment version number to 1.1.0"
     ```

3. **Push the Commit to GitHub**:
   - Push your commit to GitHub with:
     ```sh
     git push origin main
     ```
     Replace `main` with your branch name if it's different.

4. **Tagging the Release (Optional)**:
   - It's a good practice to tag your releases using Git tags, which helps in tracking different versions of your extension. To tag the new version and push the tag to GitHub, run:
     ```sh
     git tag -a v1.1.0 -m "Version 1.1.0"
     git push origin v1.1.0
     ```
     Replace `1.1.0` with your actual new version number.

5. **Creating a Release on GitHub (Optional)**:
   - Go to your repository on GitHub, click on "Releases" > "Draft a new release".
   - Use the tag you've pushed as the release tag version, add a title, describe the changes, and publish the release.

This process updates your extension's version number and aligns your GitHub repository with the new version, maintaining a clear history of updates and changes made to your extension over time.
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Deserialize;


#[derive(Deserialize)]
struct ImageData{
  // code: u32,
  // message: String,
  data: String,
}

#[tauri::command]
async fn get_img_data(url: String) -> Result<String, String> {
  let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
  let body = response.text().await.map_err(|e| e.to_string())?;

  let img_data: ImageData = serde_json::from_str(&body).map_err(|e| e.to_string())?;
  Ok(img_data.data)
}

#[tauri::command]
async fn test_url(url: String) -> Result<bool, String> {
  let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
  let body = response.text().await.map_err(|e| e.to_string())?;
  if body == "Hello, World!" {
    Ok(true)
  } else {
    Ok(false)
  }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_img_data, test_url])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

  app_lib::run();
}

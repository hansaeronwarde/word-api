provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "word-api" {
  name     = "word-api-resources"
  location = "East US"
}

resource "azurerm_container_registry" "word-api" {
  name                     = "wordapiacr"
  resource_group_name      = azurerm_resource_group.word-api.name
  location                 = azurerm_resource_group.word-api.location
  sku                      = "Basic"
  admin_enabled            = true
}

resource "azurerm_kubernetes_cluster" "word-api" {
  name                = "word-api-aks"
  location            = azurerm_resource_group.word-api.location
  resource_group_name = azurerm_resource_group.word-api.name
  dns_prefix          = "word-api-aks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B2s" 
  }

  identity {
    type = "SystemAssigned"
  }


  tags = {
    Environment = "Dev"
  }
}

resource "azurerm_storage_account" "word-api" {
  name                     = "wordapistorage"
  resource_group_name      = azurerm_resource_group.word-api.name
  location                 = azurerm_resource_group.word-api.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}


resource "azurerm_storage_container" "word-api" {
  name                  = "random-file-container"
  storage_account_name  = azurerm_storage_account.word-api.name
  container_access_type = "private"
}
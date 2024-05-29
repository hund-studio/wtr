# Ongoing

This file contains all details and notes about features under ongoing development

## Link and DataWrapper

The goal of this implementation is to remove the need for onFetch skeletons and preloaders.
First DataWrapper instance should be loaded using data from Wordpress (in <script JSON> tag)

Place link in UI > User clicks link > Link trigger a fetch inside DataCOntext > on dataContextUpdate navigate to new path and paginate with new data.

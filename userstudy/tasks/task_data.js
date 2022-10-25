var taskDatasets = {
  conference: {
    domain: "conference",
    tasks: [
      {
        "qtype": "identifying", // correct mapping
        "question": "How many mappings are shown in the visualization in total?",
        "atype": "number",
        "answer": "10"
      },
      {
        "qtype": "identifying", // correct mapping - multiple inheritance
        "question": "How many classes is \"Author\" in the left ontology mapped to?",
        "atype": "number",
        "answer": "2"
      },
      {
        "qtype": "identifying", // incorrect mapping
        "question": "What is \"SlideSet\" in the left ontology mapped to in the right ontology?",
        "atype": "class",
        "answer": "Document"
      },
      {
        "qtype": "identifying", // missing mapping
        "question": "Does the mapping from \"Author\" (in the left ontology) to \"Possible_Reviewer\" (in the right ontology) exist in the visualization?",
        "atype": "class",
        "answer": "No"
      },
      {
        "qtype": "validation", // correct mapping
        "question": "Is \"AcademicEvent\" in the left ontology is correctly mapped?",
        "atype": "class",
        "answer": "Yes"
      },
      {
        "qtype": "creation", // missing mapping
        "question": "Are there any other mappings that should be created between the ontologies but are currently absent from the visualization? List as many missing mappings as you can (ex. \"x\",\"y\")",
        "atype": "class",
        "answer": "" // multiple
      },
      {
        "qtype": "creation", // incorrect mapping
        "question": "\"SecurityTopic\"-->\"Research_Topic\" Are there any other mappings that should be created between the given ontology pair but are currently absent from the visualization?",
        "atype": "class",
        "answer": "Yes"
      },
      {
        "qtype": "creation", // missing mapping
        "question": "Can \"Workshop\" be mapped to another class in the right ontology?",
        "atype": "class",
        "answer": "Yes"
      },
      {
        "qtype": "creation", // creation
        "question": "Which class could \"Workshop\" be mapped to in the right ontology?",
        "atype": "class",
        "answer": "workshop"
      },
    ]
  },
  anatomy:  {
    domain: "anatomy",
    tasks: [
      {
        "qtype": "identifying", // correct mapping
        "question": "How many mappings are shown in the visualization in total?",
        "atype": "number",
        "answer": "10"
      },
      {
        "qtype": "identifying", // correct mapping
        "question": "How many classes is \"Skin\" in the left ontology mapped to?",
        "atype": "number",
        "answer": "1"
      },
      {
        "qtype": "identifying", // correct mapping
        "question": "What is \"Viscera\" in the left ontology mapped to in the right ontology?",
        "atype": "class",
        "answer": "visceral organ system"
      },
      {
        "qtype": "identifying", // incorrect mapping
        "question": "Does the mapping from \"Heart\" (in the left ontology) to \"muscle\" (in the right ontology) exist in the visualization?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "validation", // incorrect mapping
        "question": "Is \"Cartilage\" in the left ontology correctly mapped?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "identifying", // missing mapping
        "question": "Can \"Joint\" be mapped to another class in the right ontology?",
        "atype": "y/n",
        "answer": "Yes"
      },
      {
        "qtype": "creation", // missing mapping
        "question": "Which class could \"Heart\" be mapped to in the right ontology?",
        "atype": "class",
        "answer": "joint"
      },
      {
      "qtype": "identifying", // correct mapping
        "question": "What is \"Skull\" in the left ontology mapped to in the right ontology?",
        "atype": "class",
        "answer": "cranium"
      },
      {
        "qtype": "validation", // incorrect mapping
        "question": "\"Urinary_System_Part\" is mapped to \"muscle\". Is this a correct mapping?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "validation", // incorrect mapping
        "question": "\"Cheek\" in the left ontology is mapped to \"cuticle\" in the right ontology. Is this a correct mapping?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "identifying", // correct mapping
        "question": "Is the mapping from \"Skin\" in the left ontology to \"skin\" in the right ontology correct?",
        "atype": "y/n",
        "answer": "Yes"
      },
      {
        "qtype": "validation", // incorrect mapping
        "question": "Is the mapping from \"Mucus\" in the left ontology to \"nasal mucus\" in the right ontology correct?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "creation", // missing mapping
        "question": " What class can \"Lip\" in the left ontology be mapped to in the right ontology?",
        "atype": "class",
        "answer": "Lip"
      },
      {
        "qtype": "identifying", // missing mapping
        "question": "Is there a mapping that should exist between \”Arm\” in the left ontology to another class in the right ontology?",
        "atype": "y/n",
        "answer": "Yes"
      },
      {
        "qtype": "creation", // missing mapping
        "question": "Are there any other mappings that should be created between the ontologies but are currently absent from the visualization? List as many missing mappings as you can (ex. \"x\",\"y\")",
        "atype": "class",
        "answer": "" // multiple
      }
    ]
  }
};
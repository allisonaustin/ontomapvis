var taskDatasets = {
  conference: {
    domain: "conference",
    tasks: [
      {
        "qtype": "identifying",
        "question": "How many mappings are shown in the visualization in total?",
        "atype": "number",
        "answer": "11"
      },
      {
        "qtype": "identifying",
        "question": "How many classes is \"Author\" in the left ontology mapped to?",
        "atype": "number",
        "answer": "2"
      },
      {
        "qtype": "identifying",
        "question": "What is \"SlideSet\" in the left ontology mapped to in the right ontology?",
        "atype": "class",
        "answer": "Document"
      },
      {
        "qtype": "identifying",
        "question": "Does the mapping from \"Possible_Reviewer\" (in the right ontology) to \"Author\" (in the left ontology) exist in the visualization?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "validation",
        "question": "\"OrganizationalMeeting\" (in the left ontology) and \"Conference\" (in the right ontology) share the same parent class.",
        "atype": "y/n",
        "answer": "Yes"
      },
      {
        "qtype": "validation",
        "question": "Do you think \"AcademicEvent\" in the left ontology is correctly mapped?",
        "atype": "y/n",
        "answer": "Yes"
      },
      {
        "qtype": "creation",
        "question": "\"Author\" in the left ontology is mapped to an incorrect pair. Which class in the right ontology should it be mapped to instead?",
        "atype": "class",
        "answer": "Paper_Author"
      },
      {
        "qtype": "creation",
        "question": "There is a missing mapping in the visualization. \"Presenter\" in the left ontology should be mapped to what class in the right ontology?",
        "atype": "class",
        "answer": "Presenter"
      },
      {
        "qtype": "creation",
        "question": "\"Workshop\" in the left ontology has no mapping shown in the visualization. Can it be mapped to another class in the right ontology?",
        "atype": "y/n",
        "answer": "Yes"
      }
    ]
  },
  anatomy:  {
    domain: "anatomy",
    tasks: [
      {
        "qtype": "identifying",
        "question": "How many mappings are shown in the visualization in total?",
        "atype": "number",
        "answer": "10"
      },
      {
        "qtype": "identifying",
        "question": "How many classes is \"Skin\" in the left ontology mapped to?",
        "atype": "number",
        "answer": "1"
      },
      {
        "qtype": "identifying",
        "question": "What is \"Viscera\" in the left ontology mapped to in the right ontology?",
        "atype": "class",
        "answer": "visceral organ system"
      },
      {
        "qtype": "identifying",
        "question": "Does the mapping from \"muscle\" (in the right ontology) to \"Heart\" (in the left ontology) exist in the visualization?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "validation",
        "question": "\"Saliva\" (in the left ontology) and \"choroid\" (in the right ontology) share the same parent class.",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "validation",
        "question": "Do you think \"Cartilage\" in the left ontology is correctly mapped?",
        "atype": "y/n",
        "answer": "No"
      },
      {
        "qtype": "creation",
        "question": "\"Cartilage\" in the left ontology is mapped to an incorrect pair. Which class in the right ontology should it be mapped to instead?",
        "atype": "class",
        "answer": "cartilage"
      },
      {
        "qtype": "creation",
        "question": "There is a missing mapping in the visualization. \"Blood\" in the left ontology should be mapped to what class in the right ontology?",
        "atype": "class",
        "answer": "blood"
      },
      {
        "qtype": "creation",
        "question": "\"Joint\" in the left ontology has no mapping shown in the visualization. Can it be mapped to another class in the right ontology?",
        "atype": "y/n",
        "answer": "Yes"
      }
    ]
  }
};
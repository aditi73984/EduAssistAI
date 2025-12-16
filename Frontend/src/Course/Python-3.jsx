import React, { useState } from "react";

export default function AIMLDSCourse() {
  const topics = [
    {
      title: "1. Introduction to Data Science",
      theory: `What is Data Science?
Data Science combines statistics, programming, and domain knowledge to extract insights and build data-driven products. It spans data collection, cleaning, EDA, modeling, evaluation, and production.

Core ideas (deep):
- Problem framing: define objective (prediction, classification, clustering, recommendation).
- Data lifecycle: collection → storage → cleaning → analysis → modeling → deployment → monitoring.
- Roles: data engineer (pipelines), data scientist (models & analysis), ML engineer (production), research scientist (novel models).

Why it matters:
- Decisions backed by data reduce guesswork.
- Reproducible pipelines and careful validation avoid bad product decisions.

Best practices:
- Start with a clear question/hypothesis.
- Reproducible environment (venv/conda, requirements).
- Version data and code; maintain simple experiments log.

Common pitfalls:
- Jumping to complex models before understanding data.
- Data leakage (using test data information during training).
- Ignoring class imbalance or sampling biases.`,
      example: `# Project-skeleton (pseudo)
# 1) data_ingest.py  -> collect and store raw data
# 2) cleaning.ipynb   -> EDA + data cleaning
# 3) modeling.py     -> training & validation
# 4) serve.py        -> expose model as API`,
      questions: [
        "Define data science in your own words.",
        "List the steps of a data science project pipeline.",
        "Why is reproducibility important in DS?"
      ],
      video: "https://www.youtube.com/embed/ua-CiDNNj30"
    },

    {
      title: "2. Types of Data & Data Collection",
      theory: `Data types:
- Structured: tables (CSV, RDBMS).
- Semi-structured: JSON, logs.
- Unstructured: text, images, audio, video.

Collection methods:
- APIs, web scraping, databases, sensors, manual labeling.
- Streaming vs batch ingestion.

Quality & schema:
- Validate types, ranges, and constraints early.
- Create an initial data schema and track changes.

Ethics & privacy:
- Avoid collecting PII unless necessary; apply anonymization.
- Respect legal/regulatory requirements (GDPR, etc.).`,
      example: `# Pseudocode: API ingestion
import requests
resp = requests.get("https://api.example.com/data")
data = resp.json()
# store as parquet for columnar reads`,
      questions: [
        "When to use streaming ingestion vs batch?",
        "Name 3 common data quality issues.",
        "How to handle PII in datasets?"
      ],
      video: "https://www.youtube.com/embed/O5nskjZ_GoI"
    },

    {
      title: "3. Data Cleaning & Preprocessing",
      theory: `Cleaning steps (deep):
- Missing values: analyze patterns (MCAR/MAR/MNAR), choose drop vs impute (mean/median/model-based).
- Outliers: detect (IQR, z-score), decide keep/transform/remove.
- Data types: convert strings to categorical/datetime as appropriate.
- Text cleaning: tokenization, lowercasing, remove punctuation (but consider domain needs).
- Feature scaling: StandardScaler vs MinMax depending on algorithms.
- Encoding: one-hot, ordinal, target encoding (careful with leakage).

Pipeline & reproducibility:
- Build preprocessing as a pipeline (sklearn Pipeline / ColumnTransformer).
- Fit transforms on training data only — avoid leakage.

Tips:
- Always inspect small sample before mass operations.
- Save processing metadata (mappings, encoders).`,
      example: `# sklearn Pipeline example (pseudo)
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

pipe = Pipeline([
  ("imputer", SimpleImputer(strategy="median")),
  ("scaler", StandardScaler())
])`,
      questions: [
        "What is data leakage and give an example?",
        "When use median imputation vs mean?",
        "Why put preprocessing in a Pipeline?"
      ],
      video: "https://www.youtube.com/embed/ZtqBQ68cfY4"
    },

    {
      title: "4. Exploratory Data Analysis (EDA)",
      theory: `EDA objectives:
- Understand distributions, relationships, missingness, and anomalies.
- Generate hypotheses and guide feature engineering.

Techniques:
- Univariate: histograms, boxplots, value_counts.
- Bivariate: scatterplots, grouped bar charts, correlation matrices.
- Multivariate: pairplots, PCA for visualization of high-dim data.
- Time-series EDA: resampling, decomposition, trend/seasonality checks.

Interpretation:
- Use domain knowledge to interpret patterns, not just visuals.
- Check for class imbalance and sampling biases early.

Automated EDA:
- Tools like pandas-profiling, Sweetviz can accelerate initial checks but always follow with manual inspection.`,
      example: `# pandas quick EDA
print(df.info())
print(df.describe())
sns.heatmap(df.corr(), annot=True)`,
      questions: [
        "What plots would you use to check class imbalance?",
        "How to visually detect multicollinearity?",
        "Why is domain knowledge critical in EDA?"
      ],
      video: "https://www.youtube.com/embed/5Zg-C8AAIGg"
    },

    {
      title: "5. Feature Engineering",
      theory: `Why feature engineering:
- Models learn from features—good features often outweigh choice of model.
- Transform raw signals into predictive inputs.

Common methods:
- Binning continuous variables (pd.cut).
- Interaction features (product / ratio).
- Aggregations from transactional data (groupby features).
- Date/time features (hour, day, lag features).
- Encoding categorical variables (one-hot, target encoding with CV to avoid leakage).
- Text features: TF-IDF, n-grams, embeddings.
- Feature crossing for trees or linear models depending on needs.

Automation:
- Featuretools (automated feature engineering) can help for relational/tabular data but validate usefulness.

Best practices:
- Keep features interpretable when possible.
- Track feature generation steps and store code so features can be reproduced.`,
      example: `# Example: create lag features for time-series
df['lag_1'] = df['value'].shift(1)
df['rolling_mean_7'] = df['value'].rolling(7).mean()`,
      questions: [
        "Why is target leakage a risk with feature engineering?",
        "When to use embeddings vs TF-IDF for text?",
        "Give examples of aggregation-based features."
      ],
      video: "https://www.youtube.com/embed/4y8zQY1KZ3s"
    },

    {
      title: "6. Feature Selection & Dimensionality Reduction",
      theory: `Goals:
- Reduce noise and overfitting.
- Improve model performance and interpretability.
- Reduce computation time.

Techniques:
- Filter: correlation thresholds, chi-square, mutual information.
- Wrapper: recursive feature elimination (RFE), forward/backward selection.
- Embedded: Lasso (L1) and tree-based feature importances.
- Dimensionality reduction: PCA (linear), t-SNE/UMAP (non-linear, visualization). Use PCA for decorrelation and speed in linear models.

Caveats:
- t-SNE/UMAP are for visualization, not feature transformation for modeling (they can distort distances).
- Always validate selection on CV to avoid overfitting selection itself.`,
      example: `# Example: use SelectKBest for univariate selection
from sklearn.feature_selection import SelectKBest, f_classif
selector = SelectKBest(f_classif, k=10)
X_new = selector.fit_transform(X, y)`,
      questions: [
        "When to use PCA vs SelectKBest?",
        "Explain embedded feature selection with Lasso.",
        "Why validate feature selection via cross-validation?"
      ],
      video: "https://www.youtube.com/embed/f5dz3bvs3WU"
    },

    {
      title: "7. ML Fundamentals & Workflow",
      theory: `ML workflow (deep):
1) Define problem (metric matters).
2) Collect & clean data.
3) Feature engineering & selection.
4) Split data (train/val/test) with correct stratification for classification.
5) Choose baseline model and iterate.
6) Tune hyperparameters using CV.
7) Evaluate on holdout test set.
8) Deploy, monitor, and retrain as necessary.

Key concepts:
- Bias-Variance tradeoff: underfitting vs overfitting.
- Cross-validation: estimate generalization reliably.
- Baselines: always build a simple baseline (mean predictor, logistic regression).
- Metrics: choose metric aligned with business (e.g., F1 for imbalanced, RMSE for regression).

Model validation:
- Use nested CV for fair hyperparameter selection estimates when data is limited.`,
      example: `# simple baseline example
from sklearn.dummy import DummyClassifier
dummy = DummyClassifier(strategy="most_frequent")
dummy.fit(X_train, y_train)
print(dummy.score(X_test, y_test))`,
      questions: [
        "Why is a baseline model important?",
        "Explain bias-variance tradeoff with examples.",
        "When to use nested cross-validation?"
      ],
      video: "https://www.youtube.com/embed/GwIo3gDZCVQ"
    },

    {
      title: "8. Regression Algorithms (Linear, Ridge, Lasso, Trees)",
      theory: `Linear models:
- Linear Regression: interpretability, closed-form solutions via OLS.
- Regularization: Ridge (L2) shrinks coefficients, Lasso (L1) can zero-out (feature selection).
- When to use: fast baselines, interpretable features.

Tree models:
- Decision Trees: non-linear, handle mixed types, prone to overfitting.
- Random Forest: bagged trees reduce variance.
- Gradient Boosting: XGBoost/LightGBM/CatBoost excel on tabular data.

Diagnostics:
- Residual analysis for linear models.
- Check feature importance and partial dependence for trees.

Scaling:
- Linear models need scaling; tree models generally do not.`,
      example: `# Ridge regression example
from sklearn.linear_model import Ridge
model = Ridge(alpha=1.0)
model.fit(X_train, y_train)
preds = model.predict(X_test)`,
      questions: [
        "When to prefer Ridge over Lasso?",
        "Why do tree models handle missing values differently?",
        "Explain residual analysis for regression."
      ],
      video: "https://www.youtube.com/embed/9z5E7C2xZpY"
    },

    {
      title: "9. Classification Algorithms (Logistic, Trees, SVM, KNN)",
      theory: `Logistic regression:
- Models log-odds; outputs probabilities via sigmoid; interpretable coefficients.

KNN:
- Instance-based, simple, sensitive to scaling and curse of dimensionality.

SVM:
- Max-margin classifier; kernel trick allows non-linear boundaries; scales poorly for very large datasets.

Trees & ensembles:
- Use RandomForest or boosting for strong performance on structured data.

Evaluation:
- Confusion matrix, precision, recall, F1, ROC-AUC.
- For imbalanced datasets consider PR curves and class-weighting / resampling.

Calibration:
- Some classifiers produce poorly calibrated probabilities — calibrate if probabilities are used in decision systems.`,
      example: `# example: evaluate logistic regression
from sklearn.metrics import classification_report
print(classification_report(y_test, model.predict(X_test)))`,
      questions: [
        "Why scale features before KNN or SVM?",
        "When to use ROC-AUC vs PR-AUC?",
        "Explain kernel trick in SVM (high level)."
      ],
      video: "https://www.youtube.com/embed/6v7z6tjfG5k"
    },

    {
      title: "10. Unsupervised Learning & Clustering",
      theory: `Clustering goals:
- Discover structure without labels (customer segments, anomaly detection).

Algorithms:
- KMeans: centroid-based, requires K and spherical clusters.
- DBSCAN: density-based, finds arbitrary shapes and noise points (no K).
- Hierarchical clustering: dendrograms for multi-scale cluster structure.

Dimensionality reduction:
- PCA for linear subspace projection.
- t-SNE/UMAP for visualization of high-dim structure.

Evaluation:
- Silhouette score, Davies-Bouldin index, and domain-specific validation.`,
      example: `# KMeans example
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3).fit(X)
labels = kmeans.labels_`,
      questions: [
        "When to prefer DBSCAN over KMeans?",
        "Explain silhouette score.",
        "Why use t-SNE for visualization only?"
      ],
      video: "https://www.youtube.com/embed/8C9kQeLhG1Q"
    },

    {
      title: "11. Model Evaluation & Metrics (Regression & Classification)",
      theory: `Regression metrics:
- MAE: mean absolute error (robust to outliers).
- MSE/RMSE: penalize large errors.
- R^2: explainable variance (use carefully).

Classification metrics:
- Accuracy (simple, can be misleading).
- Precision, Recall, F1-score (trade-offs).
- ROC-AUC: ranking ability across thresholds.
- Confusion matrix: types of errors.

Advanced:
- Use cost-sensitive metrics if false positives/negatives have different costs.
- Calibration and reliability diagrams for probability outputs.

Cross-validation:
- Stratified CV for classification; use time-series CV for temporal data.`,
      example: `# compute metrics
from sklearn.metrics import mean_squared_error, roc_auc_score
rmse = mean_squared_error(y_test, preds, squared=False)
auc = roc_auc_score(y_test, probs)`,
      questions: [
        "When is accuracy misleading?",
        "Why use RMSE vs MAE?",
        "Explain stratified k-fold."
      ],
      video: "https://www.youtube.com/embed/NC8H2lqfRrY"
    },

    {
      title: "12. Hyperparameter Tuning & Cross-Validation",
      theory: `Tuning strategies:
- GridSearchCV: exhaustive for small spaces.
- RandomizedSearchCV: sample-based, efficient for large spaces.
- Bayesian optimization (Optuna): intelligent search for best params.

Cross-validation best practices:
- Use nested CV when reporting generalization after tuning.
- Use time-series split for sequential data.

Practical tips:
- Monitor overfitting of validation; use early stopping.
- Use parallel computation and sensible search ranges.`,
      example: `# Randomized search example
from sklearn.model_selection import RandomizedSearchCV
# define param_dist and RandomizedSearchCV(clf, param_dist, n_iter=50, cv=5)`,
      questions: [
        "What is nested cross-validation and why use it?",
        "When to use RandomizedSearchCV vs GridSearchCV?",
        "Why early stopping helps prevent overfitting?"
      ],
      video: "https://www.youtube.com/embed/3CC4N4z3GJc"
    },

    {
      title: "13. Feature Importance & Interpretability",
      theory: `Why interpretability:
- Business stakeholders need explanations.
- Detect model bias and failure modes.

Techniques:
- Global: feature importance (tree-based), coefficients (linear models).
- Local: SHAP, LIME for per-prediction explanations.
- Partial dependence plots show marginal effect of a feature.

Caveats:
- Importance from tree models can be biased for high-cardinality features.
- Use permutation importance for more reliable ranking.`,
      example: `# permutation importance (sklearn)
from sklearn.inspection import permutation_importance
r = permutation_importance(model, X_test, y_test)`,
      questions: [
        "Explain SHAP values at a high level.",
        "Why is model interpretability important in production?",
        "When to use permutation importance?"
      ],
      video: "https://www.youtube.com/embed/6I2cwY2B1Lk"
    },

    {
      title: "14. Time Series Basics & Forecasting",
      theory: `Time-series specifics:
- Stationarity, trend, seasonality, autocorrelation.
- Feature engineering: lags, rolling stats, seasonal dummies.
- Models: ARIMA/ETS for classical methods; LSTM/Transformer for deep learning.
- Evaluation: walk-forward validation, backtesting, rolling windows.

Practical tips:
- Visualize series decomposition.
- Use differencing to remove trend/seasonality for ARIMA.
- Always respect temporal order in splits.`,
      example: `# simple lag features
df['lag1'] = df['y'].shift(1)
df['rolling7'] = df['y'].rolling(7).mean()`,
      questions: [
        "Why can't you shuffle time series data before splitting?",
        "What is stationarity and how to test for it?",
        "Explain walk-forward validation."
      ],
      video: "https://www.youtube.com/embed/8hWwGJ0VxwA"
    },

    {
      title: "15. Deep Learning Fundamentals",
      theory: `Neural network essentials:
- Layers, activations (ReLU, tanh, sigmoid), loss functions (MSE, cross-entropy).
- Backpropagation: compute gradients via chain rule and update weights with optimizers (SGD, Adam).
- Regularization: dropout, weight decay; BatchNorm stabilizes training.

Practical training:
- Normalize inputs, use appropriate batch sizes.
- Monitor training vs validation curves to detect overfitting.
- Use callbacks (ModelCheckpoint, EarlyStopping).

Transfer learning:
- Fine-tune pretrained models to save data and compute.`,
      example: `# simple Keras model (pseudo)
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense
model = Sequential([Dense(64, activation='relu', input_shape=(n_features,)), Dense(1, activation='sigmoid')])`,
      questions: [
        "Explain role of activation functions.",
        "What is batch normalization?",
        "Why use pretrained models?"
      ],
      video: "https://www.youtube.com/embed/tPYj3fFJGjk"
    },

    {
      title: "16. Convolutional Neural Networks (CV basics)",
      theory: `CNN concepts:
- Convolutional layers detect local patterns with shared weights.
- Pooling reduces spatial size and increases receptive field.
- Architectures: VGG (simplicity), ResNet (skip connections), EfficientNet (compound scaling).

Data handling:
- Data augmentation (flips, crops, color jitter).
- Transfer learning from ImageNet often yields strong baselines.

Practical:
- Use pretrained backbones and add custom heads for your task.`,
      example: `# transfer learning pseudocode
from tensorflow.keras.applications import ResNet50
base = ResNet50(weights='imagenet', include_top=False, pooling='avg')`,
      questions: [
        "Why use convolutional layers for images?",
        "Explain skip connections (ResNet) simply.",
        "What is data augmentation?"
      ],
      video: "https://www.youtube.com/embed/2-Ol7ZB0MmU"
    },

    {
      title: "17. Sequence Models & NLP Basics",
      theory: `NLP pipeline:
- Tokenization, vocabulary, embeddings (word2vec/GloVe), contextual models (BERT).
- Sequence models: RNN, LSTM (historical), now Transformers dominate.
- Transformers: self-attention computes context-aware token reps; pretraining+finetuning paradigm.

Text preprocessing:
- Handle OOV tokens with subword tokenizers (BPE/WordPiece).
- Use pretrained embeddings when data is limited.

Practical tips:
- Fine-tune transformers for downstream tasks (classification, QA, NER).`,
      example: `# TF-IDF pipeline (sklearn)
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(max_features=5000)
X = vec.fit_transform(corpus)`,
      questions: [
        "What are contextual embeddings?",
        "Why use subword tokenization?",
        "When to fine-tune vs use feature-based approach?"
      ],
      video: "https://www.youtube.com/embed/8rXD5-xhemo"
    },

    {
      title: "18. Transfer Learning & Fine-Tuning",
      theory: `Transfer learning:
- Reuse pretrained models (vision or language) and fine-tune on specific tasks.
- Advantages: less data, faster convergence, often better performance.

Approaches:
- Feature extraction: freeze backbone, train head.
- Fine-tuning: unfreeze part/all of backbone and train with small LR.

Practical:
- Use discriminative learning rates (smaller for pretrained layers).
- Monitor for catastrophic forgetting.`,
      example: `# pseudocode: freeze base then add head
for layer in base.layers: layer.trainable = False
# add new head and train`,
      questions: [
        "What is catastrophic forgetting?",
        "When to freeze layers and when to unfreeze?",
        "Why use a smaller LR for pretrained layers?"
      ],
      video: "https://www.youtube.com/embed/0G6yc0GkS2g"
    },

    {
      title: "19. Generative Models & LLM Basics",
      theory: `Generative models:
- GANs: generator vs discriminator (images).
- VAEs: probabilistic latent variable models.
- LLMs (Transformers): autoregressive or encoder-decoder models for text generation, summarization, and more.

Prompting & safety:
- Prompt engineering affects outputs; few-shot examples can guide behavior.
- Guardrails and safety checks required before real-world use.

Practical:
- Use pretrained LLMs via APIs or lightweight local models for prototyping.`,
      example: `# pseudocode: call LLM API
response = llm.generate(prompt="Summarize: " + text)`,
      questions: [
        "Difference between autoregressive and encoder-decoder models?",
        "What is a GAN at a high level?",
        "Why prompt engineering matters?"
      ],
      video: "https://www.youtube.com/embed/LMK8l9xX3n8"
    },

    {
      title: "20. Model Deployment (APIs, Docker, Monitoring)",
      theory: `Deployment steps:
- Save model artifact (joblib, saved_model, torch.save).
- Wrap model with API (FastAPI/Flask), include input validation and schema checks.
- Containerize with Docker; orchestrate with Kubernetes for scale.
- Monitoring: latency, error rates, prediction distributions, data drift.

Observability:
- Log inputs/outputs (privacy-aware), track model metrics, set alarms on drift.

CI/CD:
- Automate tests for preprocessing and model contract; automate builds and deployments.

Security:
- Rate limit endpoints, authenticate calls, validate inputs to avoid injection attacks.`,
      example: `# FastAPI skeleton (pseudo)
from fastapi import FastAPI
app = FastAPI()
@app.post("/predict")
def predict(payload: dict):
  features = preprocess(payload)
  return {"pred": model.predict([features])[0]}`,
      questions: [
        "What is data drift and how to detect it?",
        "Why use Docker for model serving?",
        "What production metrics would you monitor?"
      ],
      video: "https://www.youtube.com/embed/0yWAtQ6wYNM"
    },

    {
      title: "21. MLOps & Production Pipelines",
      theory: `MLOps principles:
- Reproducibility, automation, continuous training and deployment, monitoring, versioning.
- Tools: Airflow/Prefect (pipelines), MLflow/Weights&Biases (experiments), DVC (data versioning).

Pipeline elements:
- Data validation (Great Expectations), feature store, model registry, retraining triggers.

Governance:
- Model cards, data lineage, audit logs.

Best practices:
- Automate tests for data and preprocessing.
- Run canary deployments before full rollout.`,
      example: `# pipeline steps (pseudo)
ingest -> validate -> transform -> train -> evaluate -> register -> deploy`,
      questions: [
        "What is a feature store and why use it?",
        "How to set up retraining triggers?",
        "Name tools for experiment tracking."
      ],
      video: "https://www.youtube.com/embed/1g3G8wR2g9U"
    },

    {
      title: "22. Ethics, Privacy & Responsible AI",
      theory: `Ethical considerations:
- Fairness: measure perf across subgroups and mitigate bias.
- Privacy: anonymization, differential privacy techniques.
- Explainability: provide understandable reasons for decisions where high-stakes.
- Accountability: human-in-the-loop for sensitive decisions.

Regulatory:
- Understand GDPR and local privacy laws; avoid unnecessary retention of PII.

Operational:
- Conduct impact assessments before model launch.`,
      example: `# model card metadata example (json)
{
  "name":"loan-default-v1",
  "owners":["team@example.com"],
  "intended_use":"assist loan officers",
  "limitations":"Not validated for population X"
}`,
      questions: [
        "How to check model fairness?",
        "What is differential privacy (high level)?",
        "Why maintain a model card?"
      ],
      video: "https://www.youtube.com/embed/0KC7m8bB5nY"
    },

    {
      title: "23. Capstone Project Templates & Portfolio Tips",
      theory: `Project ideas:
- Tabular ML: churn prediction with pipeline + deployment.
- CV: fine-tune a ResNet for custom image dataset and deploy demo.
- NLP: sentiment analysis or Q&A using pretrained transformers.
- Time-series: demand forecasting with backtesting and pipeline.

Portfolio tips:
- Clear README, dataset description, reproducible notebooks, deployed demo (Streamlit/Flask), concise results and lessons learned.
- Use version control and attach evaluation artifacts (confusion matrices, calibration plots).`,
      example: `# portfolio README snippet
## Churn Prediction
- Dataset: ...
- Steps: EDA -> Features -> Models -> Deployment
- Results: baseline 0.62 F1, final 0.78 F1`,
      questions: [
        "List 3 project ideas that show end-to-end skills.",
        "How to present results to recruiters?",
        "What artifacts to include in a portfolio?"
      ],
      video: "https://www.youtube.com/embed/aircAruvnKk"
    }
  ];

  const [index, setIndex] = useState(0);
  const selected = topics[index];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-10 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-slate-50 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-extrabold mb-3 text-indigo-700">AI • ML • Data Science — Full Course</h2>
        <p className="text-sm text-gray-600 mb-4">Click a topic to open full, deep notes. Each topic includes theory, examples, practice questions & video.</p>
        <ul className="space-y-2 max-h-[70vh] overflow-auto pr-2">
          {topics.map((t, i) => (
            <li
              key={i}
              onClick={() => setIndex(i)}
              className={`cursor-pointer p-2 rounded-md transition-colors ${
                index === i ? "bg-indigo-100 text-indigo-900 font-semibold" : "hover:bg-slate-100 text-gray-700"
              }`}
            >
              <div className="text-sm">{t.title}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="md:w-3/4 bg-indigo-50/30 rounded-lg p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-2xl font-extrabold text-indigo-800">{selected.title}</h3>

        <div className="text-gray-800 whitespace-pre-line leading-relaxed">
          {selected.theory}
        </div>

        <div className="w-full mt-2">
          <iframe
            className="w-full h-[260px] md:h-[380px] rounded-md"
            src={selected.video}
            title={selected.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-indigo-700">Example / Snippet</h4>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-md text-sm whitespace-pre-wrap">
            {selected.example}
          </pre>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-indigo-700">Practice & Interview Questions</h4>
          <ul className="list-decimal pl-6 mt-2 space-y-2 text-gray-800">
            {selected.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className={`px-4 py-2 rounded-md font-semibold ${index === 0 ? "bg-gray-300 text-gray-600" : "bg-indigo-700 text-white hover:bg-indigo-800"}`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-600">{index + 1} / {topics.length}</div>

          <button
            onClick={() => setIndex((i) => Math.min(topics.length - 1, i + 1))}
            disabled={index === topics.length - 1}
            className={`px-4 py-2 rounded-md font-semibold ${index === topics.length - 1 ? "bg-gray-300 text-gray-600" : "bg-indigo-700 text-white hover:bg-indigo-800"}`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
